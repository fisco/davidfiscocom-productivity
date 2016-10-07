---
title: Quick Tips
layout: default
permalink: /quicktips
---

{% include libraries/rivets-js.html %}

<script>
rivets.configure({
  // Attribute prefix in templates
  prefix: 'rv',
  // Preload templates with initial data on bind
  preloadData: true,
  // Root sightglass interface for keypaths
  rootInterface: '.',
  // Template delimiters for text bindings
  templateDelimiters: ['{', '}'],
  // Alias for index in rv-each binder
  iterationAlias : function(modelName) {
    return '%' + modelName + '%';
  },
  // Augment the event handler of the on-* binder
  handler: function(target, event, binding) {
    this.call(target, event, binding.view.models)
  },
  // Since rivets 0.9 functions are not automatically executed in expressions. If you need backward compatibilty, set this parameter to true
  executeFunctions: false
})
</script>

{% include loading.html %}

{% include error-panel-trello.html %}

<div id="trello-payload" hidden>
  <div class="panel panel-primary trello-panel" rv-each-cards="cards">
    <div class="panel-heading" rv-name="cards.id">
      <div class="row">
        <div class="col-xs-9">
          <div><strong>{ cards.name }</strong></div>
          <div class=""><small>{ cards.dateMoment }</small></div>
        </div>
        <div class="col-xs-3 text-right">
          <button class="a2a_dd btn btn-default" rv-data-a2a-title="cards.nameDoubleQuotesEscaped" rv-data-a2a-url="cards.dataA2aUrl" href="https://www.addtoany.com/share">
            <i class="fa fa-share-alt" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="panel-body" rv-html="cards.descHTML"></div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.4.3/showdown.min.js"></script>
<script src="https://api.trello.com/1/client.js?key=57d49fd6474f52730d45bea8"></script>
{% include libraries/moment.min.js.html %}

<script>
Trello.get('lists/57ef1521e7629ba4cf4e7be2/cards', function(cards) {
  var converter = new showdown.Converter();
  for (var i = 0, len = cards.length; i < len; i++) {
    cards[i].nameDoubleQuotesEscaped = cards[i].name.replace(/"/g, "&quot;");
    cards[i].descHTML = converter.makeHtml(cards[i].desc);
    cards[i].dataA2aUrl = "https://productivity.davidfisco.com/quicktips#" + cards[i].id;  
    cards[i].dateMoment = moment( Date.parse(cards[i].dateLastActivity) ).format( 'D MMMM YYYY' );
  }

  rivets.bind($('#trello-payload'), {cards: cards});
  $('.loader-fisco').hide();
  $('#trello-payload').show();
  for(i=0; i<document.getElementsByClassName('trello-panel').length; i++) {
    a2a.init('page');
  }
  if (window.location.hash) {
    document.getElementsByName(window.location.hash.substr(1))[0].parentNode.className = document.getElementsByName(window.location.hash.substr(1))[0].parentNode.className.replace(/panel-primary/, 'panel-danger');
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    document.getElementsByName(window.location.hash.substr(1))[0].scrollIntoView(true);
  }
 }, function() {
   $('.loader-fisco').hide();
   $('.error-message-trello').show();
 });
</script>
