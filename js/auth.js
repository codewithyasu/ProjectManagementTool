
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm['loginEmail'].value;
      const password = loginForm['loginPassword'].value;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        window.location.href = 'dashboard.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = registerForm['registerEmail'].value;
      const password = registerForm['registerPassword'].value;
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        window.location.href = 'dashboard.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }
});
