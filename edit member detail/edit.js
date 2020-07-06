new Vue({
    el: " #app",
    data: {
      firstName: "...",
      lastName: "...",
      number: "...",
      email: "...",
      adress:"...",
      fname:"...",
      fadress:"...",
      users: [],
      i: 0
    },
    methods: {
      getData() {
        fetch("http://164.52.195.248:8062/members")
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(data => {
            this.users = data;
            this.anotherUser(this.i);
          })
          .catch(error => {
            console.error(
              "There has been a problem with your fetch operation:",
              error
            );
          });
      },
      anotherUser() {
        this.firstName = this.users[this.i].firstName;
        this.lastName = this.users[this.i].lastName;
        this.email= this.users[this.i].emailId;
        this.number = this.users[this.i].mobileNo;
        this.adress = this.users[this.i].businessAddressLine2;
        this.fadress = this.users[this.i].businessAddressLine1;
        this.fname = this.users[this.i].firmName;
        this.i++;
      },
      updateUser() {
        const userData = this.users[this.i - 1];
        userData.firstName = this.firstName;
        userData.lastName = this.lastName;
        userData.email = this.email;
        userData.mobileNo = this.number;
        userData.businessAddressLine2 = this.adress;
        userData.businessAddressLine1 = this.fadress;
        userData.firmName = this.fname;
        //console.log(userData.fadress);

        fetch('http://164.52.195.248:8062/members', {
          method: 'PUT', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    },
    mounted: function() {
      this.getData();
    }
  });