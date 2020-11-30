
firebase.auth().createUserWithEmailAndPassword(email, senha)
.then(function(result) {
//Criou usuário
})
.catch(function(error) {
//Erro ao criar usuário
})