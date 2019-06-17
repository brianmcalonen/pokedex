$(function() {
  console.log('js is connected')
  let randomNumber = Math.floor(Math.random() * 151) + 1;
  let counter = randomNumber;
  let pokeApiUrl = "http://pokeapi.salestock.net/api/v2/pokemon/" + randomNumber + "/";
  let pokeSpeciesUrl = "http://pokeapi.salestock.net/api/v2/pokemon-species/" + randomNumber + "/";
  console.log(randomNumber)

  loadData();

  function loadData() {
    $.getJSON(pokeApiUrl).done(function(data) {

      console.log('JSON loaded')
      var capName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      var capType = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
      var sprite = data.sprites.front_default;
      var pokeHeight = Math.round(((data.height) / 10) * 10) / 10;
      var pokeWeight = Math.round((((data.weight) * 2.20462) / 10) * 10) / 10;
      // var ability = (data.abilities[0].ability.name).charAt(0).toUpperCase() + data.abilities[0].ability.name.slice(1);

      $('.pokemonSprite').attr('src', sprite);
      $('.pokemonName').append(`Name: ${capName}`);
      $('.pokemonId').append(`ID # ${data.id}`);
      $('.pokemonTypes').append(`Type: ${capType}`);
      $('.pokemonHeight').append(`Height:<br/>${pokeHeight}m`);
      $('.pokemonWeight').append(`Weight:<br/>${pokeWeight}lbs`);
      $('.pokemonStats').append(`HP:  ${data.stats[5].base_stat}<br/>`);
      $('.pokemonStats').append(`Attack:  ${data.stats[4].base_stat}<br/>`);
      $('.pokemonStats').append(`Defense:  ${data.stats[3].base_stat}<br/>`);
      $('.pokemonStats').append(`Sp.Atk:  ${data.stats[2].base_stat}<br/>`);
      $('.pokemonStats').append(`Sp.Def:  ${data.stats[1].base_stat}<br/>`);
      $('.pokemonStats').append(`Speed:  ${data.stats[0].base_stat}`);
    });

    $.getJSON(pokeSpeciesUrl).done(function(data) {
      var descript = data.flavor_text_entries[1].flavor_text;
      $('.pokemonDescription').text(`${descript}`);
    });
  }

  function resetData() {
    $('.pokemonSprite').append('');
    $('.pokemonName').append('');
    $('.pokemonId').append('');
    $('.pokemonDescription').append('');
    $('.pokemonTypes').append('');
    $('.pokemonHeight').append('');
    $('.pokemonWeight').append('');
    $('.pokemonStats').append('');
  }

  $('.rightButton').click(function(){
    counter++;
    console.log(counter);
    resetData();
    // loadData();
    pokeApiUrl = "http://pokeapi.salestock.net/api/v2/pokemon/" + counter + "/";
    pokeSpeciesUrl = "http://pokeapi.salestock.net/api/v2/pokemon-species/" + counter + "/";
  });

  $('.leftButton').click(function(){
    counter--;
    console.log(counter);
    resetData();
    // loadData();
    pokeApiUrl = "http://pokeapi.salestock.net/api/v2/pokemon/" + counter + "/";
    pokeSpeciesUrl = "http://pokeapi.salestock.net/api/v2/pokemon-species/" + counter + "/";

  });

  $('.randomButton').click(function(){
    console.log(counter);
    resetData();
    // loadData();
    location.reload();
  });

})
