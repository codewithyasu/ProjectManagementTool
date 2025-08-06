
document.addEventListener('DOMContentLoaded', () => {
  const addProjectBtn = document.getElementById('addProjectBtn');
  const projectInput = document.getElementById('projectInput');
  const projectList = document.getElementById('projectList');

  // Add new project to Firestore
  addProjectBtn.addEventListener('click', async () => {
    const name = projectInput.value.trim();
    if (name === '') return alert("Please enter a project name");

    try {
      await db.collection('projects').add({ name }); // 🔥 Firestore add
      projectInput.value = '';
      loadProjects(); // refresh list
    } catch (error) {
      console.error("Error adding project:", error);
    }
  });

  //Load and display all projects
  async function loadProjects() {
    try {
      const snapshot = await db.collection('projects').get();
      projectList.innerHTML = '';

      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.className = 'bg-white p-4 rounded shadow';
        li.innerHTML = `<a class="text-blue-600 underline" href="project.html?id=${doc.id}">${data.name}</a>`;
        projectList.appendChild(li);
      });
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }

  //Initial load on page open
  loadProjects();
});


