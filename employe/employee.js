let names = {};

function setupData(members) {
  console.log(members.data);
  for(let i = 0; i < members.data.length; i++) {
    //console.log(members.data[i].employee_name);
    let name = `${members.data[i].employee_name}`;
    names[name] = null;
  }
}

fetch("http://dummy.restapiexample.com/api/v1/employees")
.then(response => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
})
.then(data => {
  setupData(data);
})
.catch(error => {
  console.error(
    "There has been a problem with your fetch operation:",
    error
  );
});

$(document).ready(function(){
  $('input.autocomplete').autocomplete({
    data: names,
  });
});

$('#clear').click(function() {
  document.querySelector('input').value = "";
})