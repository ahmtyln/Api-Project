class Profile{
    
    async getProfile(username){
        const profileResponse = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
        // console.log(profileResponse);
        const profile = await profileResponse.json();
        // console.log(profile);

        const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`);
        const todo = await todoResponse.json();


        return {
            profile,
            todo
        }
    }
}


const profileClass = new Profile();

class UI{
    constructor(){
        this.profileContainer = document.getElementById("profileContainer");
        this.alert = document.getElementById("alert");
    }

    showProfile(profile){
        this.profileContainer.innerHTML=`
            <div class="card card-body">

                <div class="row">
                    <div class="col-md-3">
                        
                        <a href="#"><img src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?b=1&k=20&m=1214428300&s=612x612&w=0&h=y7zBfFswVq5x9XxItbHb6Fd0nqW6rAesklNl42RD0nI=" class="img-thumbnail"></a>

                    </div>
                    <div class="col-md-9">
                        <h4> Contact </h4>
                        <ul class="list-group">
                            <li class="list-group-item">
                                name:${profile.name}
                            </li>
                            <li class="list-group-item">
                                username:${profile.username}
                            </li>
                            <li class="list-group-item">
                                email:${profile.email}
                            </li>
                            <li class="list-group-item">
                                adress:${profile.address.street}
                                ${profile.address.city}
                                ${profile.address.zipcode}
                                ${profile.address.suite}
                            </li>
                            <li class="list-group-item">
                                phone:${profile.phone}
                            </li>
                            <li class="list-group-item">
                                website:${profile.website}
                            </li>
                            <li class="list-group-item">
                                company:${profile.company.name}
                            </li>
                        </ul>
                        <h4 class="mt-4"> Todo List </h4>
                        <ul id="todo" class="list-group">


                        </ul>
                    </div>
                 </div>
            
            </div>
        `
    }

    showAlert(text){
        this.alert.innerHTML=`${text} is not found`
    }

    showTodo(todo){
        let html="";
        todo.forEach(element => {
            if(element.completed){
                html+=`
                    <li class="list-group-item bg-success">
                        ${element.title}
                    </li>
                `;
            }else{
                html+=`
                    <li class="list-group-item bg-secondary">
                        ${element.title}
                    </li>
                `;
            }
            
        });

        this.profileContainer.querySelector("#todo").innerHTML=html;
    }

    clear(){
        this.profileContainer.innerHTML=""
        this.alert.innerHTML=""
    }
}

const ui = new UI();


document.getElementById("searchProfile").addEventListener("keyup",(e)=>{
    ui.clear();
    let text=e.target.value;
    if(text!==""){
        profileClass.getProfile(text)
        .then(res=>{
            if(res.profile.length===0){
                ui.showAlert(text);
            }else{
                ui.showProfile(res.profile[0]);
                ui.showTodo(res.todo);
            }
        }).catch(err=>{
            ui.showAlert(text)
        })
    }
});





