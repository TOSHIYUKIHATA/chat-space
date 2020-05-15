$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="chat-body__box">
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
          <img src=${message.image} >
        </div>`
    } 
    else {
      var html =
      `<div class="chat-body__box">
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
      return html;
    }
  }

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
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
      $('submit-btn').prop('disabled', false);
    })
    .fail(function(data){
      alert("メッセージの送信に失敗しました！");  
    })
    .always(function(date) {
      $('submit-btn').prop('disabled', false);
    });
  })
})