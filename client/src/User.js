
class User {
    constructor(role, name, surname, birthdate, email, password, isConfirmed = 0){
        this.role = role;
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
        this.isConfirmed = isConfirmed;
    }

    static from(json) {
        const user = new User();
        Object.assign(user, json);
        return user;
      }
}

export default User;