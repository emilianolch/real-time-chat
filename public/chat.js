class Chat {
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
  }
}