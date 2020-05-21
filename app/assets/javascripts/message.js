$(function(){ 

  function buildHTML(message){
    if ( message.image ) {
      var html =
                `<div class="chat-body__box" data-message-id=${message.id}>
                  <div class="chat-body__box__header">
                    <div class="chat-body__box__header__name">
                      ${message.user_name}
                    </div>
                    <div class="chat-body__box__header__time">
                      ${message.created_at}
                    </div>
                  </div>
                    <div class="chat-body__box__message">
                    <div class="chat-body__box__message__content">
                      ${message.content}
                  </div>
                    <img class="lower-message__image" src=${message.image}>
                  </div>
                </div>`
    } 
    else {
      var html =
      `<div class="chat-body__box" data-message-id=${message.id}>
          <div class="chat-body__box__header">
            <div class="chat-body__box__header__name">
              ${message.user_name}
            </div>
            <div class="chat-body__box__header__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-body__box__message">
            <p class="chat-body__box__message__content">
              ${message.content}
            </p>
          </div>
        </div>`
    }
    return html;
  }


$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-body').append(html);
      $('form')[0].reset();
      $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(data){
      alert("メッセージの送信に失敗しました！");  
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.chat-body__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-body').append(insertHTML);
        $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('自動更新失敗');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});