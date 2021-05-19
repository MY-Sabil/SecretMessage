const auth = firebase.auth()

var countRef = firebase.database().ref('count/')
countRef.on('value', (snapshot) => {
    const data = snapshot.val()
    const count = data.count
    document.getElementById('number').innerHTML = `Total Messages Recieved: ${count}`
})

document.getElementById('message').addEventListener("submit", function (e) { 
    e.preventDefault()
    const message = document.getElementById("text").value

    auth.signInAnonymously()
    .then((result) =>{
        firebase.database().ref('messages/' + result.user.uid).set({
            id : result.user.uid,
            message : message,
        })

        const increase = firebase.database.ServerValue.increment(1)

        firebase.database().ref('count/').set({
            count : increase
        })
    })
})