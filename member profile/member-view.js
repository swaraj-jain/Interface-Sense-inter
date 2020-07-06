let app = new Vue({
  el: "#app",
  data: {
    memberData: null,
    dataReceived: false,
    sortedData: [],
    fullName: "...",
    firmName: "...",
    points: "...",
    business: "...",
    references: "..."
  },
  methods: {
    getMembers() {
      fetch("http://164.52.195.248:8062/members")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.memberData = data[0];
        this.sortData(this.memberData);
        this.dataReceived = true;
        console.log(data[0]);
      })
      .catch(error => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    },
    manageEmptydata(x) {
      return x? x: "..."
    },
    sortData(member) {
      // Since all the API data is not displayed on screen, I have to manually filter and sort the data
      this.sortedData.push(["Membership Type", member.membershipType.value]);
      this.sortedData.push(["Chapter", member.chapter.value]);
      this.sortedData.push(["Gender", member.gender]);
      this.sortedData.push(["Salutation", member.salutation.value]);
      this.sortedData.push(["Designation", member.designation]);
      this.sortedData.push(["Mobile", member.mobile]);
      this.sortedData.push(["Secondary Mobile no", member.phoneNo]);
      this.sortedData.push(["E-mail", member.emailId]);
      this.sortedData.push(["Primary Address", member.businessAddressLine1]);
      this.sortedData.push(["Country", member.country.value]);
      this.sortedData.push(["State", member.state.value]);
      this.sortedData.push(["City", member.city]);
      this.sortedData.push(["Pincode", member.zipCode]);
      this.sortedData.push(["Secondary Address", member.businessAddressLine2]);
      this.sortedData.push(["Primary Business", member.businessCategory.value]);
      this.sortedData.push(["Secondary Address", member.secondaryBusiness]);
      this.sortedData.push(["About the business", member.aboutTheBusiness]);
      this.fullName = `${member.firstName} ${member.lastName}`
      this.firmName = member.firmName;
      this.points = member.membershipType.totalPoints;
      this.business = member.chapter.totalPoints;
      this.references = member.salutation.totalPoints;
    }
  },
  mounted() {
    this.getMembers();
  }
})