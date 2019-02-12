export class Character {
    constructor(role, name) {
        this.role = role;
        this.name = name;
    }

    toJson = () => {
        return {
            role: this.role,
            name: this.name
        }
    }
}