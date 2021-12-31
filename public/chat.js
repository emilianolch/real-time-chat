class Chat {
  constructor(params) {
    this.currentUser = params.currentUser
    this.initializeChat() 
  }

  async initializeChat() {
    this.$chat = document.querySelector('.chat')
    this.$usersList = this.$chat.querySelector('.users-list')
    this.$currentUser = this.$chat.querySelector('.current-user')
    this.$textInput = this.$chat.querySelector('input')
    this.$messagesList = this.$chat.querySelector('.messages-list')

    this.$chat.classList.remove('hidden')
    this.$currentUser.innerText = `Logged in as ${this.currentUser.name}`

    this.users = (await this.fetchUsers()).filter(u => u.id !== socket.id)
    this.renderUsers()
  }

  async fetchUsers() {
    const res = await fetch('/users')
    return await res.json()
  }

  renderUsers() {
    this.$usersList.innerHTML = ''

    const $users = this.users.map(u => {
      const $user = document.createElement('div')
      $user.innerText = u.name
      $user.dataset.id = u.id
      return $user
    })

    this.$usersList.append(...$users)
  }
}