// Get references to the target entity and overlay
    const targetEntity = document.querySelector('#targetEntity');
    const overlay = document.querySelector('#overlay');
    const upperLeft = document.querySelector('#upperleft');
    const upperRight = document.querySelector('#upperright');
    const lowerLeft = document.querySelector('#lowerleft');
    const scene = document.querySelector('a-scene');

      // Add event listeners for target detection
      targetEntity.addEventListener('targetFound', () => {
        overlay.style.display = 'block'; // Show overlay when target is detected
      });

      targetEntity.addEventListener('targetLost', () => {
        overlay.style.display = 'none'; // Hide overlay when target is lost
      });

      // Get reference to the text box
      const textbox = document.querySelector('#upperleft');

      // Add a click event listener to the text box
      textbox.addEventListener('click', () => {
        // Change the content of the text box
        textbox.innerHTML = `
          <div class="data_type">CO₂</div>
          <div class="data_value">400 ppm</div>
        `;
      });

  // Function to convert 3D position to 2D screen coordinates
    function updatePosition() {
        const camera = scene.camera;
        const targetPosition = targetEntity.object3D.position.clone();
        const screenPosition = targetPosition.project(camera);

    // Convert normalized device coordinates (NDC) to screen coordinates
        const screenX = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (-screenPosition.y * 0.5 + 0.5) * window.innerHeight;

        // Update positions of the elements
        upperLeft.style.left = `${screenX - 100}px`; // Adjust offset as needed
        upperLeft.style.top = `${screenY - 100}px`;

        upperRight.style.left = `${screenX + 100}px`;
        upperRight.style.top = `${screenY - 100}px`;

        lowerLeft.style.left = `${screenX - 100}px`;
        lowerLeft.style.top = `${screenY + 100}px`;
  }

  function modelAnimation() {
    const model = document.querySelector('#model');
    model.setAttribute('animation property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate');
  }

  scene.addEventListener('renderstart', () => {
  scene.renderer.setAnimationLoop(() => {
    updatePosition();
  });
});