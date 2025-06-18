import { createSlice, nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const saveGoalsToLocalStorage = (state) => {
  localStorage.setItem('goals', JSON.stringify({
    goals: state.goals,
    allocatedIncomePercentage: state.allocatedIncomePercentage,
  }));
};

const stored = JSON.parse(localStorage.getItem('goals'));

const initialState = {
  goals: stored?.goals || [],
  allocatedIncomePercentage: stored?.allocatedIncomePercentage || 100,
};

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: {
      reducer(state, action) {
        const { id, name, targetAmount, percentage, createdAt } = action.payload;
        const totalExisting = state.goals.reduce((acc, goal) => acc + goal.percentage, 0);
        const totalWithNew = totalExisting + percentage;

        if (totalWithNew > 100) {
          const reductionFactor = (100 - percentage) / totalExisting;
          state.goals.forEach(goal => {
            goal.percentage = parseFloat((goal.percentage * reductionFactor).toFixed(2));
          });
        }

        state.goals.push({
          id,
          name,
          targetAmount,
          percentage,
          savedAmount: 0,
          createdAt,
          lastTransferred: null,
        });
        saveGoalsToLocalStorage(state);
      },
      prepare(goalData) {
        return {
          payload: {
            ...goalData,
            id: nanoid(),
            createdAt: dayjs().format('YYYY-MM-DD'),
          },
        };
      },
    },
    deleteGoal(state, action) {
      const idToDelete = action.payload;
      const goalToDelete = state.goals.find(g => g.id === idToDelete);
      if (!goalToDelete) return;

      const remainingGoals = state.goals.filter(g => g.id !== idToDelete);
      const redistributeAmount = goalToDelete.percentage / remainingGoals.length;

      remainingGoals.forEach(goal => {
        goal.percentage = parseFloat((goal.percentage + redistributeAmount).toFixed(2));
      });

      state.goals = remainingGoals;
      saveGoalsToLocalStorage(state);
    },
    updateGoalPercentage(state, action) {
      const { id, percentage } = action.payload;
      const goal = state.goals.find(g => g.id === id);
      if (goal) goal.percentage = percentage;
      saveGoalsToLocalStorage(state);
    },
    updateAllGoalPercentages(state, action) {
      const updated = action.payloa
      updated.forEach(({ id, percentage }) => {
        const goal = state.goals.find(g => g.id === id);
        if (goal) goal.percentage = percentage;
      });
      saveGoalsToLocalStorage(state);
    },
    setAllocatedIncomePercentage(state, action) {
      state.allocatedIncomePercentage = action.payload;
      saveGoalsToLocalStorage(state);
    },
    resetGoalPercentages(state) {
      const equalPercent = +(100 / state.goals.length).toFixed(2);
      state.goals.forEach(goal => {
        goal.percentage = equalPercent;
      });
      saveGoalsToLocalStorage(state);
    },
    transferToGoals: (state, action) => {
      const income = action.payload;
      const amountToAllocate = (state.allocatedIncomePercentage / 100) * income;

      state.goals.forEach(goal => {
        if (goal.savedAmount < goal.targetAmount) {
          const goalShare = (goal.percentage / 100) * amountToAllocate;
          const remaining = goal.targetAmount - goal.savedAmount;
          goal.savedAmount += Math.min(goalShare, remaining);
        }
      });
      saveGoalsToLocalStorage(state);
    },
    autoTransferMonthly(state, action) {
      const currentDate = dayjs();
      const monthlyIncome = action.payload;
      const totalAllocation = (monthlyIncome * state.allocatedIncomePercentage) / 100;

      state.goals.forEach(goal => {
        const creationDate = dayjs(goal.createdAt);
        const lastTransferred = goal.lastTransferred ? dayjs(goal.lastTransferred) : creationDate;

        if (
          currentDate.date() === creationDate.date() &&
          currentDate.diff(lastTransferred, 'month') >= 1 &&
          goal.savedAmount < goal.targetAmount
        ) {
          const share = (totalAllocation * goal.percentage) / 100;
          const remaining = goal.targetAmount - goal.savedAmount;

          const amountToTransfer = Math.min(share, remaining);
          goal.savedAmount += amountToTransfer;
          goal.lastTransferred = currentDate.format('YYYY-MM-DD');
        }
      });
      saveGoalsToLocalStorage(state);
    },
  },
});

export const { addGoal, deleteGoal, updateGoalPercentage, updateAllGoalPercentages, setAllocatedIncomePercentage, resetGoalPercentages, transferToGoals, autoTransferMonthly} = goalSlice.actions;

export default goalSlice.reducer;
