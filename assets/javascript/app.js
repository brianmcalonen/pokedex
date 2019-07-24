let randomNumber = Math.floor(Math.random() * 804) + 1;
$(document).ready(function() {

  
  let counter;

  // Random Button Function
  $(".randomButton").on("click", function(event) {
    event.preventDefault();
    randomNumber = Math.floor(Math.random() * 804) + 1;

    console.log(randomNumber);
    console.log("click");

    resetData();
    searchPokemon(randomNumber);
    
  })

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
          pokeTypes.push(type)
        }
      }
      // response.types.each(type => {
      //   pokeTypes += (type.charAt(0).toUpperCase() + type.slice(1))
      // })
  
      $(".pokemonSprite").attr("src", response.sprites.front_default);
      $(".pokemonName").text(`${pokeName}`);
      $(".pokemonId").text(response.id);
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
      var flavorText = response.flavor_text_entries[2].flavor_text;
      $(".pokemonDescription").text(flavorText);
    })
  }

  // Reset Data Function
  function resetData() {
    $(".pokemonStats").text("");
  }

  // Call Function on Page Load
  searchPokemon(randomNumber);


// End of $(document).ready(function(){})
});

