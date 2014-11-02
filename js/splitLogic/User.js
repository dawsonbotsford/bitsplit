exports.User = User;

function User (id, paid) {
    this.id = id;
    this.paid = paid;
    this.diff = 0;
}
