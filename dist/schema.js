export const typeDefs = `#graphql
type Employee{
empID:ID!
name:String!
age:Int!
gender:String!
dob:String!
payroll:PayrollData!
}
type PayrollData{
    empID: ID!,
      basic: Int!,
      HRA: Int!,
      DA: Int!,
      GrossSalary: Int!
      personal:Employee!
}
type Query{
    employees:[Employee]
    payrollData:[PayrollData]
    employeeInfo(empID:ID!):Employee
    payrollInfo(empID:ID!):PayrollData

}
type Mutation{
    addEmployee(emp:EmployeeType!):Employee
    deleteEmployee(empID:ID!):[Employee]
    updateEmployee(empID:ID!,emp:EmployeeEditType):Employee

}

input EmployeeType{
    name:String!
    age:Int!
    gender:String!
    dob:String!}

    input EmployeeEditType{
        name:String
        age:Int
        gender:String
        dob:String
    }
`;
