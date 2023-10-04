import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { employees, payrollData, users } from "./data.js";
const resolvers = {
    Query: {
        employees() {
            return employees;
        },
        payrollData() {
            return payrollData;
        },
        queryUsers() {
            return users;
        },
        employeeInfo(parent, args) {
            return employees.find((employee) => employee.empID === args.empID);
        },
        payrollInfo(parent, args) {
            return payrollData.find((payroll) => payroll.empID === args.empID);
        }
    },
    Employee: {
        payroll(parent) {
            return payrollData.find((p) => p.empID === parent.empID);
        }
    },
    PayrollData: {
        personal(parent) {
            return employees.find((e) => e.empID === parent.empID);
        }
    },
    Mutation: {
        addEmployee(parent, args) {
            let emp = { ...args.emp, empID: Math.floor(Math.random() * 1000).toString() };
            employees.push(emp);
            return emp;
        },
        deleteEmployee(parent, args) {
            let remEloyees = employees.filter((e) => e.empID !== args.empID);
            return remEloyees;
        },
        updateEmployee(parent, args) {
            let updatedEmployees = employees.map((emp) => {
                if (emp.empID === args.empID) {
                    return { ...emp, ...args.emp };
                }
                return emp;
            });
            return updatedEmployees.find((emp) => emp.empID === args.empID);
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at  ${url}`);
