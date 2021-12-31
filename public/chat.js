class Chat {
  constructor(params) {
    this.currentUser = params.currentUser
    this.initializeChat() 
  }

  initializeChat() {
    this.$chat = document.querySelector('.chat')
    this.$usersList = this.$chat.querySelector('.users-list')
    this.$currentUser = this.$chat.querySelector('.current-user')
    this.$textInput = this.$chat.querySelector('input')
    this.$messagesList = this.$chat.querySelector('.messages-list')

    this.$chat.classList.remove('hidden')
  }
}