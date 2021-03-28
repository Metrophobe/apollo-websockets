const expenses = require('../data/expenses');
import { PubSub } from 'graphql-subscriptions';
 
const pubSub = new PubSub();


const resolvers = {
    Query: {
        expenses: () => expenses
    }, 
    Mutation:  {
        newExpense: (root, args) => {
            console.log({args});
            pubSub.publish('expense',{
                newExpenseCreated: args
            }); 
    }}, 
    Subscription: {
        newExpenseCreated: {
            subscribe: () => pubSub.asyncIterator('expense')
        }
    }
}

export default resolvers;