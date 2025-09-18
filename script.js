document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-icon');
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate bottle falling
    tl.from('.product-bottle', {
        y: -400,
        opacity: 0,
        duration: 2,
        ease: 'bounce.out',
        delay: 0.5
    });

    // Animate text content
    tl.from(['.hero-title', '.hero-subtitle', '.cta-buttons'], {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2
    }, "-=1.5"); // Overlap with bottle animation

    // Animate feature tags
    tl.from('.feature-tag', {
        opacity: 0,
        scale: 0.5,
        stagger: 0.2
    }, "-=1");

    // --- Three.js Particle Background ---
    let scene, camera, renderer, particles;

    function initThreeJS() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('particle-canvas').appendChild(renderer.domElement);

        const particleCount = 3000;
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.03, // Smaller particles for a subtle look
            color: 0x6A0DAD, // Purple particles
            transparent: true,
            opacity: 0.3
        });
        particles = new THREE.Points(particlesGeometry, particleMaterial);
        scene.add(particles);

        window.addEventListener('resize', onWindowResize, false);
        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.00005;
        particles.rotation.x += 0.00005;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initThreeJS();
});


//______________________________________________________________

// --- GSAP Animations for Ingredients Section ---
const ingredientsSection = document.getElementById('ingredients-section');
if (ingredientsSection) {

    gsap.from(".ingredient-card", {
        // ScrollTrigger configuration
        scrollTrigger: {
            trigger: ".ingredients-grid", // The element that triggers the animation
            start: "top 85%", // Starts when the top of the grid is 85% down the viewport
            toggleActions: "play none none none", // Plays the animation once
        },
        
        // Animation properties
        opacity: 0,
        y: 60, // Start 60px below final position
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1, // Stagger each card's animation by 0.1 seconds
    });
}



//_______________________________________________________________________________________________
// --- GSAP Animations for How to Use Section ---
const howToUseSection = document.getElementById('how-to-use');
if (howToUseSection) {

    // Use GSAP's matchMedia for responsive animations
   // ...with this new, universal animation code.
const verticalTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 70%",
        end: "bottom 80%",
        scrub: 1.5,
    }
});

verticalTimeline.from(".timeline-progress", { scaleY: 0 })
                .from(".timeline-step", { opacity: 0, x: -30, stagger: 0.5 }, "-=0.5");


}
// --- Testimonials Section ---
// --- Story Testimonials Section ---
const storySection = document.getElementById('story-testimonials');
if (storySection) {

    // --- 1. Three.js Subtle Particle Background ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('testimonial-particle-bg').appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({ size: 0.005, color: 0x009688 });
    const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleMesh);
    camera.position.z = 5;

    const animateParticles = () => {
        requestAnimationFrame(animateParticles);
        particleMesh.rotation.y += 0.0001;
        renderer.render(scene, camera);
    };
    animateParticles();


    // --- 2. GSAP Scroll-Triggered Animations ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".story-timeline",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1.5,
        }
    });

    // Animate the timeline line drawing

    
    // Animate each testimonial item
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach(item => {
        tl.from(item.querySelector('.testimonial-bubble'), {
            opacity: 0,
            x: () => item.classList.contains('item-left') ? -100 : 100,
            ease: "power2.out"
        }, "-=0.2");
        
        tl.from(item.querySelector('.customer-avatar'), {
            opacity: 0,
            scale: 0,
            ease: "back.out(1.7)"
        }, "-=0.4");
        
        tl.from(item.querySelector('.star-rating'), {
            opacity: 0.5,
            repeat: 3,
            yoyo: true,
            ease: "power1.inOut"
        }, "-=0.3");
    });
    
    // Animate the header
    gsap.from(".story-header", {
        scrollTrigger: { trigger: ".story-header", start: "top 80%" },
        opacity: 0,
        y: 50,
        letterSpacing: "-0.1em",
        duration: 1,
        ease: "power2.out"
    });

    // --- 3. Canvas Particle Burst Animation for Final Testimonial ---
    const burstCanvas = document.getElementById('particle-burst-canvas');
    if(burstCanvas){
        const ctx = burstCanvas.getContext('2d');
        let particles = [];
        
        const triggerBurst = () => {
            for(let i = 0; i < 50; i++){
                particles.push({
                    x: burstCanvas.width / 2,
                    y: burstCanvas.height / 2,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    alpha: 1,
                    color: `hsl(${Math.random() * 60 + 20}, 100%, 70%)` // Gold tones
                });
            }
            animateBurst();
        };
        
        const animateBurst = () => {
            ctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.02;
                if(p.alpha <= 0) particles.splice(i, 1);
                
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            if(particles.length > 0) requestAnimationFrame(animateBurst);
        };
        
        // Trigger the burst with ScrollTrigger
        ScrollTrigger.create({
            trigger: ".final-testimonial",
            start: "top 60%",
            once: true,
            onEnter: triggerBurst
        });
    }
}

// --- GSAP Animations for Radial Guarantee Section ---
const radialSection = document.getElementById('radial-guarantee');
if (radialSection) {
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#radial-guarantee",
            start: "top 50%",
            toggleActions: "play none none none"
        }
    });

    // 1. Animate Header
    tl.from(".guarantee-header", { opacity: 0, y: 30, duration: 1, ease: "power2.out" });

    // 2. Animate Center Emblem
    tl.from(".center-emblem", { opacity: 0, scale: 0.5, duration: 1, ease: "back.out(1.7)" }, "-=0.5");

    // 3. Animate Guarantee Points flying into place
    gsap.utils.toArray('.guarantee-point').forEach((point, i) => {
        tl.from(point, {
            opacity: 0,
            scale: 0,
            x: (i % 2 === 0) ? -200 : 200, // Fly in from left/right
            y: Math.random() * 100 - 50,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8"); // Staggered overlap
    });

    // 4. Animate CTA Button
    tl.from(".btn-cta-radial", { opacity: 0, y: 50, duration: 1.5, ease: "bounce.out" }, "-=0.5");

    // 5. Continuous slow orbit animation (starts after main animation)
    gsap.to(".guarantee-points-wrapper", {
        rotation: 360,
        duration: 50,
        ease: "none",
        repeat: -1,
        scrollTrigger: { // Only animate when section is in view
            trigger: "#radial-guarantee",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause"
        }
    });
    
    // 6. Parallax background waves
    gsap.to(".bg-wave", {
        x: (i, target) => (i === 0 ? -100 : 100),
        ease: "none",
        scrollTrigger: {
            trigger: "#radial-guarantee",
            start: "top bottom",
            end: "bottom top",
            scrub: 2
        }
    });
}

 // Safe guard if GSAP fails: remove js-hidden classes so elements remain visible
    (function(){
      const jsHiddenEls = document.querySelectorAll('.js-hidden');
      jsHiddenEls.forEach(el => el.classList.remove('js-hidden'));
    })();

    // Floating label: toggle .filled on input change or on load if value preset
    const fieldWrappers = document.querySelectorAll('.field');
    fieldWrappers.forEach(wrapper => {
      const input = wrapper.querySelector('input, textarea');
      if(!input) return;
      const toggle = () => {
        if(input.value && input.value.trim() !== "") wrapper.classList.add('filled');
        else wrapper.classList.remove('filled');
      };
      // initial:
      toggle();
      input.addEventListener('input', toggle);
      input.addEventListener('change', toggle);
      input.addEventListener('blur', toggle);
    });

    // GSAP animations
    if(window.gsap){
      gsap.registerPlugin(ScrollTrigger);

      // Entrance timeline for heading + form sections
      const tl = gsap.timeline({
        defaults:{duration:0.8, ease:'power3.out'},
        scrollTrigger:{
          trigger:'.card',
          start:'top 80%',
          once:true
        }
      });

      tl.from('#headingBlock', {y:30, opacity:0, scale:0.995})
        .from('#formBlock', {y:30, opacity:0, scale:0.995}, "-=0.4")
        // reveal each field with stagger
        .from('.order-form .field', {y:18, opacity:0, stagger:0.12, duration:0.6}, "-=0.2")
        .from('.cta-button', {scale:0.96, opacity:0, duration:0.6}, "-=0.2");

      // small pulse animation for CTA (subtle)
      gsap.to('.cta-button', {
        boxShadow: "0 18px 50px rgba(0,184,148,0.16)",
        repeat:-1,
        yoyo:true,
        duration:2.8,
        ease:'sine.inOut',
        paused:false,
        delay:1.4
      });

      // On focus, add teal border animation using GSAP (optional)
      const fields = document.querySelectorAll('.field input, .field textarea');
      fields.forEach(f => {
        f.addEventListener('focus', (e)=>{
          gsap.to(e.target.closest('.field'), {borderColor:"rgba(0,150,136,0.28)", boxShadow:"0 14px 40px rgba(0,150,136,0.09)", duration:0.22});
        });
        f.addEventListener('blur', (e)=>{
          gsap.to(e.target.closest('.field'), {borderColor:"rgba(255,255,255,0.6)", boxShadow:"0 6px 18px rgba(7,50,52,0.04)", duration:0.22});
        });
      });
    }

    // WhatsApp integration: replace phone number below with your merchant number if needed
    document.getElementById('confirmBtn').addEventListener('click', function(){
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const qty = document.getElementById('qty').value.trim() || '1';
      const product = "Fairy Organic Hair Tonic";

      // basic validation
      if(!name || !phone || !address){
        alert("Please fill in Name, Phone and Address before confirming.");
        return;
      }

      // build message (encoded properly)
      const message = `🛒 New Order %0A--------------------%0A👤 Name: ${encodeURIComponent(name)}%0A📞 Phone: ${encodeURIComponent(phone)}%0A📦 Product: ${encodeURIComponent(product)}%0A🔢 Quantity: ${encodeURIComponent(qty)}%0A🏠 Address: ${encodeURIComponent(address)}`;

      // merchant number (use international format without +). Replace if needed.
      const merchant = "+923168292651";

      // open WhatsApp (web/desktop) in new tab
      const url = `https://wa.me/${merchant}?text=${message}`;
      window.open(url, "_blank");
    });

    // small accessibility: allow Enter on inputs to trigger confirm when focus on last field
    document.getElementById('orderForm').addEventListener('keydown', function(e){
      if(e.key === 'Enter' && e.target.tagName !== 'TEXTAREA'){
        e.preventDefault();
        document.getElementById('confirmBtn').click();
      }
    });
