$(document).ready(function() {

  let randomNumber = Math.floor(Math.random() * 804) + 1;
  let counter;

  // Random Button Function
  $(".randomButton").on("click", function(event) {
    event.preventDefault();
    randomNumber = Math.floor(Math.random() * 804) + 1;
    resetData();
    searchPokemon(randomNumber);
  });

  // Left Button Function
  $(".leftButton").on("click", function(event) {
    event.preventDefault();
    counter = --randomNumber;
    searchPokemon(counter);
    resetData();
  });

  // Right Button Function
  $(".rightButton").on("click", function(event) {
    event.preventDefault();
    counter = ++randomNumber;
    searchPokemon(counter);
    resetData();
  });

  // Search By Name
  $('#nameForm').on('submit', function(event){
    event.preventDefault();
    const inputValue = $('input.pokemonName').val().toLowerCase();
    searchPokemon(inputValue);
    resetData();
  })

  // Search By ID
  $('#idForm').on('submit', function(event){
    event.preventDefault();
    const inputValue = $('input.pokemonId').val();
    if(inputValue > 0 && inputValue < 805) {
      searchPokemon(inputValue);
      resetData();  
    }
  })

  // Search Pokemon Function
  function searchPokemon(num) {
    var queryURL = "https://pokeapi.co/api/v2/pokemon/" + num;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
  
      var pokeHeight = Math.round(((response.height) / 10) * 10) / 10;
      var pokeWeight = Math.round((((response.weight) * 2.20462) / 10) * 10) / 10;
      var pokeName = response.name.charAt(0).toUpperCase() + response.name.slice(1);

      var pokeTypes = [];
      for(var i = 0; i < response.types.length; i++){
        var type = response.types[i].type.name.charAt(0).toUpperCase() + response.types[i].type.name.slice(1);
        if(!pokeTypes.includes(type)) {
          pokeTypes.push(` ${type}`)
        }
      }

      $(".pokemonSprite").attr("src", response.sprites.front_default);
      $(".pokemonName").val(pokeName);
      $(".pokemonId").val(response.id);
      $('.pokemonTypes').text(`Type: ${pokeTypes}`);
      $('.pokemonHeight').text(`Height: ${pokeHeight} m`);
      $('.pokemonWeight').text(`Weight: ${pokeWeight} lbs`);
      $('.pokemonStats').append(`HP:  ${response.stats[5].base_stat}<br/>`);
      $('.pokemonStats').append(`Attack:  ${response.stats[4].base_stat}<br/>`);
      $('.pokemonStats').append(`Defense:  ${response.stats[3].base_stat}<br/>`);
      $('.pokemonStats').append(`Sp.Atk:  ${response.stats[2].base_stat}<br/>`);
      $('.pokemonStats').append(`Sp.Def:  ${response.stats[1].base_stat}<br/>`);
      $('.pokemonStats').append(`Speed:  ${response.stats[0].base_stat}`);
    });
  
    var flavorURL = "https://pokeapi.co/api/v2/pokemon-species/" + num;
  
    $.ajax({
      url: flavorURL,
      method: "GET"
    }).then(function(response){
      var flavorText;

      for(var i = 0; i < response.flavor_text_entries.length; i++) {
        if(response.flavor_text_entries[i].language.name === "en") {
          flavorText = response.flavor_text_entries[i].flavor_text;
        }
      }
        $(".pokemonDescription").text(flavorText);
    })
  }

  // Load Team
  function loadTeam() {
    // original array set to 
    // get ids from localStorage
    // array of ids
    // load card 
  }

  // Save to Local Storage
  $(".saveButton").on("click", function(){
    const pokemonId = $('input.pokemonId').val();
    console.log(`pokemon id: ${pokemonId}`)

    const pokemonTeam = [3,6,9,47,142,150];

    // Set pokemonTeam to localStorage
    for(let i = 0; i < pokemonTeam.length; i++) {
      console.log(pokemonTeam[i])
      window.localStorage.setItem(`pokemon${pokemonTeam[i]}`, JSON.stringify(pokemonTeam[i]));
    }

    updateLocalStorage()
  });

  // Delete Pokemon
  $('.deleteBtn').on("click", function(){
    console.log("clicked")
  })
  

  // Reset Data Function
  function resetData() {
    $(".pokemonStats").text("");
  }

  // Call Function on Page Load
  searchPokemon(randomNumber);


// End of $(document).ready(function(){})
});

