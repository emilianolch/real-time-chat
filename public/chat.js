class Chat {
  activeChatId = null
  messages = {}

  constructor(params) {
    this.currentUser = params.currentUser
    this.initializeChat()
    this.initializeListeners()
  }

  async initializeChat() {
    this.$chat = document.querySelector('.chat')
    this.$usersList = this.$chat.querySelector('.users-list')
    this.$currentUser = this.$chat.querySelector('.current-user')
    this.$textInput = this.$chat.querySelector('input')
    this.$messagesList = this.$chat.querySelector('.messages-list')

    this.$chat.classList.remove('hidden')
    this.$currentUser.innerText = `Logged in as ${this.currentUser.name}`

    const users = await this.fetchUsers()
    this.renderUsers(users)
  }

  initializeListeners() {
    socket.on('users-changed', (users) => {
      this.renderUsers(users)
    })

    socket.on('new-chat-message', (message) => {
      this.addMessage(message.text, message.senderId)
      
      if (this.activeChatId === message.senderId) {
        this.renderMessages(message.senderId)
      }
      else {
        this.$usersList
          .querySelector(`div[data-id="${message.senderId}"]`)
          .classList.add('has-new-notification')
      }
    })
  }

  async fetchUsers() {
    const res = await fetch('/users')
    return await res.json()
  }

  renderUsers(users) {
    this.$usersList.innerHTML = ''
    const $users = users.filter(u => u.id !== socket.id).map(u => {
      const $user = document.createElement('div')
      $user.innerText = u.name
      $user.dataset.id = u.id
      return $user
    })
    this.$usersList.append(...$users)
    this.initializeUsersListeners($users)
  }

  initializeUsersListeners($users) {
    $users.forEach($user => {
      $user.addEventListener('click', () => {
        this.activateChat($user)
      })
    })
  }

  activateChat($user) {
    const userId = $user.dataset.id

    if (this.activeChatId) {
      this.$usersList.querySelector(`div[data-id="${this.activeChatId}"]`).classList.remove('active')
    }
    this.activeChatId = userId
    $user.classList.add('active')
    this.$textInput.classList.remove('hidden')
    this.renderMessages(userId)

    this.$usersList
      .querySelector(`div[data-id="${userId}"]`)
      .classList.remove('has-new-notification')

    this.$textInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const message = {
          text: this.$textInput.value,
          recipientId: this.activeChatId
        }
        socket.emit('new-chat-message', message)
        this.$textInput.value = ''
        this.addMessage(message.text, message.recipientId)
        this.renderMessages(message.recipientId)
      }
    })
  }

  addMessage(text, userId) {
    if (!this.messages[userId]) {
      this.messages[userId] = []
    }
    this.messages[userId].push(text)
  }

  renderMessages(userId) {
    this.$messagesList.innerHTML = ''
    
    if (!this.messages[userId]) {
      this.messages[userId] = []
    }

    const $messages = this.messages[userId].map((message) => {
      const $message = document.createElement('div')
      $message.innerText = message
      return $message
    })

    this.$messagesList.append(...$messages)
  }
}