// class addDepartment {
//     private depName: string;

//     constructor(depName: string) {
//         this.depName = depName;
//     }

//     async buildQuery(): Promise <string> {
//         try{
//             // Start the transaction
//             await client.query('BEGIN');
//             // Insert the department
//             await client.query(`
//                 INSERT INTO department (id, name)
//                 VALUES ()`)

//         } catch (err) {
//             console.error('Error building query in addDepartment.ts:', err);
//             return err;
//         }
//     }

// }

// adding some changes to get commit to work