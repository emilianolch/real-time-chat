class WelcomeScreen {
  constructor() {
    this.$welcomeScreen = document.querySelector('.welcome-screen')
    this.$loginBtn = this.$welcomeScreen.querySelector('button')
    this.$input = this.$welcomeScreen.querySelector('input')

    this.initializeListeners()
  }

  initializeListeners() {
    this.$loginBtn.addEventListener('click', () => {
      if (this.$input.value === '') {
        return
      }

      this.$welcomeScreen.classList.add('hidden')

      const currentUser = {
        name: this.$input.value
      }
      
      socket.emit('user-connected', currentUser)
      new Chat({ currentUser })
    })
  }
}