require('dotenv').config();
const User = require('../../models/user');

describe('add user to db', () => {

    const user = { username: "Marv22", email: 'Marv22@yahoo.com', password: "123456" };

    afterAll(async done => {
        try {

            await User.dbClose();
            done();

        } catch(err) {
            console.log(err);
        }

      });

    it('should add user to the user table', async () => {
        try {
            const newUser = new User(user.username, user.email, user.password);
            await newUser.save();
    
            const [ savedUser ] = await User.findByEmail(user.email);
        
            expect(user.email).toEqual(savedUser[0].email);
  
        } catch(err) {
            console.log(err);
        }
    });
});