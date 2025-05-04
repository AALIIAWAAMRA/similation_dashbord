function simulationApp() {
   return {
      topics: [
         { name: "Networek Attack", tool: "python", category: "cyber security", reserved: true, reservedBy: "boulgamh lahcen nidhal, zerouali abdessamed , zoigreire bader el amir" },
         { name: "IOT accses Simulation", tool: "python", category: "Networek", reserved: true, reservedBy: "ABIDA HIBA, ABDELAZIZ BESMALA, ARAB DOUAA ALLAH HADJER, yezzaoui norhen" },
         { name: "galton board simulation", tool: "python", category: "Physics", reserved: true, reservedBy: "Boussentoh mohamed nadir,Senoussi adjoued,Chaira yahia Bouabdallah mohaned" },
         { name: "Uber simulation", tool: "AnyLogic", category: "software Engineering ", reserved: true, reservedBy: "Aya bousiouda,Douaa bouhali,Sara menina,Hadjer ines maansri,Selma mkhloufi" },
         { name: "Network systems and their vulnerabilities", tool: "python", category: "cyber security", reserved: true, reservedBy: "Aya benakcha ,Mayada Loucif , Darine Hamel ,Minen boughris ,Hadil khelelfa" },
         { name: "Block Collision", tool: "python", category: "Networek", reserved: true, reservedBy: "Wala Eddine Boulebbina, YEZZA Ayoub, Djarallah Aymen, Mouslim Beneddeb" },
         { name: "Trafic light system", tool: "SimScale", category: "Engineering", reserved: true, reservedBy: "chouha aya, Alim chaloach,anfel zeghini,Doaa charara,Medour mohamed" },
         { name: " Blokchain Transaction", tool: "python", category: "Business", reserved: true, reservedBy: "Hamza Rouabah, Lakhdari Rida,Abderraouf Baguigu" },
         { name: "Aerodynamic Vehicle Design", tool: "ANSYS", category: "Engineering", reserved: false, reservedBy: null },
         { name: "Crowd Behavior Analysis", tool: "NetLogo", category: "Social", reserved: false, reservedBy: null },
         { name: "3D Animation & Motion Simulation", tool: "Blender", category: "Engineering", reserved: false, reservedBy: null },
         { name: "Disease Spread Modeling", tool: "python", category: "Healthcare", reserved: false, reservedBy: null },
         { name: "Architectural Acoustics Simulation", tool: "SimScale", category: "Physics", reserved: false, reservedBy: null },
         { name: "Market Trend Prediction", tool: "Python", category: "Business", reserved: false, reservedBy: null },
         { name: "Heat Transfer in Buildings", tool: "ANSYS", category: "Physics", reserved: false, reservedBy: null },
         { name: "Emergency Evacuation Planning", tool: "Unity", category: "Social", reserved: false, reservedBy: null },
         { name: "Renewable Energy System Design", tool: "MATLAB", category: "Engineering", reserved: false, reservedBy: null }
      ],
      filteredTopics: [],
      searchQuery: "",
      filterStatus: "all",
      filterCategory: "all",
      showModal: false,
      selectedTopicIndex: null,
      selectedTopic: null,
      studentName: "",
      reservedTopicsForWheel: [],
      isSpinning: false,
      selectedPresenter: null,
      spinDuration: 5000, // 5 seconds
      
      init() {
         this.filteredTopics = [...this.topics];
         // Get only reserved topics for the wheel
         this.updateReservedTopicsForWheel();

         this.initDarkMode();
         
         // Apply animations to table rows on load
         setTimeout(() => {
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach((row, index) => {
                  row.classList.add('animate__animated', 'animate__fadeInUp');
                  row.style.animationDelay = `${index * 0.05}s`;
            });
         }, 300);
      },
      

      // Add these functions to your simulationApp() return object

// Add these properties to your simulationApp() data
darkMode: false,
showTopicDetails: false,
detailedTopic: null,
exportOptions: false,

// Initialize dark mode preference
initDarkMode() {
   // Check for saved preference
   const savedDarkMode = localStorage.getItem('darkMode') === 'true';
   if (savedDarkMode) {
      this.darkMode = true;
      document.documentElement.classList.add('dark-mode');
   }
},

// Toggle dark mode
toggleDarkMode() {
   this.darkMode = !this.darkMode;
   localStorage.setItem('darkMode', this.darkMode);
   
   if (this.darkMode) {
      document.documentElement.classList.add('dark-mode');
   } else {
      document.documentElement.classList.remove('dark-mode');
   }
},

// Show topic details
showTopicDetailsModal(topic) {
   this.detailedTopic = topic;
   this.showTopicDetails = true;
},

// Reserve topic from details modal
reserveDetailedTopic() {
   // Find the topic in the array
   const topicIndex = this.topics.findIndex(t => t.name === this.detailedTopic.name);
   if (topicIndex !== -1) {
      this.selectedTopicIndex = this.filteredTopics.findIndex(t => t.name === this.detailedTopic.name);
      this.selectedTopic = this.detailedTopic;
      this.showTopicDetails = false;
      this.showModal = true;
   }
},

// Get team members as array
getTeamMembers(reservedBy) {
   if (!reservedBy) return [];
   return reservedBy.split(',').map(member => member.trim());
},

// Get topic description
getTopicDescription(topicName) {
   const descriptions = {
      "Networek Attack": "Develop simulation models for network security vulnerabilities. Students will simulate various attack vectors and defense mechanisms to understand how cybersecurity systems can be compromised and protected.",
      "Financial Market Modeling": "Create simulation models to analyze financial market behaviors under various economic conditions. Study patterns, predict market trends, and evaluate investment strategies in volatile markets.",
      "Hospital Patient Flow Optimization": "Model patient flow in healthcare facilities to optimize resource allocation, reduce wait times, and improve overall efficiency of patient care processes.",
      "Supply Chain Network Analysis": "Simulate global supply chain networks to identify bottlenecks, minimize costs, and improve resilience against disruptions like natural disasters or market fluctuations.",
      "Structural Analysis of Bridges": "Model and analyze the structural integrity of bridge designs under various load conditions and environmental factors. Identify critical points of failure and optimize design parameters.",
      "Urban Traffic Flow Simulation": "Create simulation models of urban traffic patterns to optimize traffic light timing, road layouts, and public transportation routes to reduce congestion.",
      "Weather Prediction Models": "Develop simulation models that forecast weather patterns based on historical data and atmospheric conditions. Study the impact of climate variables on prediction accuracy.",
      "Virtual Reality Surgical Training": "Design immersive VR simulations for surgical training, allowing medical students to practice procedures in a risk-free virtual environment with realistic feedback.",
      "Social Network Influence Model": "Simulate how information, trends, and behaviors spread through social networks. Analyze the impact of key influencers and network structure on information diffusion.",
      "Earthquake Impact Simulation": "Model the effects of earthquakes on buildings and infrastructure. Test different construction methods and materials to improve resilience in earthquake-prone regions.",
      "Manufacturing Process Optimization": "Simulate industrial manufacturing processes to identify inefficiencies, reduce waste, and optimize production scheduling and resource allocation.",
      "Population Growth Models": "Develop demographic simulations to study population growth trends, migration patterns, and the impact of policy decisions on demographic changes over time.",
      "Aerodynamic Vehicle Design": "Create simulation models to analyze the aerodynamic properties of vehicle designs. Optimize shapes and features to reduce drag and improve fuel efficiency.",
      "Crowd Behavior Analysis": "Simulate crowd movement and behavior in various scenarios like evacuations, public gatherings, or transportation hubs to improve safety and crowd management strategies.",
      "3D Animation & Motion Simulation": "Develop realistic motion simulations for animated characters or objects. Study physics-based animation techniques for natural movement representation.",
      "Disease Spread Modeling": "Create epidemiological models to simulate the spread of infectious diseases through populations. Analyze the effectiveness of different intervention strategies.",
      "Architectural Acoustics Simulation": "Model sound propagation within architectural spaces to optimize acoustic properties for concert halls, theaters, or office environments.",
      "Market Trend Prediction": "Develop simulation models that analyze consumer behavior and market trends to predict future market movements and consumer preferences.",
      "Heat Transfer in Buildings": "Simulate thermal dynamics within buildings to optimize HVAC systems, improve energy efficiency, and enhance thermal comfort for occupants.",
      "Emergency Evacuation Planning": "Model evacuation scenarios for buildings or urban areas to identify bottlenecks and optimize evacuation routes and procedures.",
      "Renewable Energy System Design": "Simulate renewable energy systems like solar farms or wind turbines to optimize placement, configuration, and output under various environmental conditions."
   };
   
   return descriptions[topicName] || "Detailed description will be available soon.";
},

// Get topic learning objectives
getTopicObjectives(topicName) {
   const objectives = {
      "Networek Attack": [
         "Understand common network vulnerabilities and attack vectors",
         "Develop simulation models for penetration testing and security analysis",
         "Implement defense strategies and analyze their effectiveness",
         "Apply machine learning for anomaly detection in network traffic"
      ],
      "Financial Market Modeling": [
         "Analyze market volatility and risk factors using simulation techniques",
         "Develop predictive models for market behavior under different conditions",
         "Implement portfolio optimization strategies based on simulation results",
         "Evaluate the impact of external economic factors on financial markets"
      ],
      "Hospital Patient Flow Optimization": [
         "Identify bottlenecks in patient processing and resource allocation",
         "Develop optimization algorithms for scheduling and resource management",
         "Apply queueing theory to hospital operations",
         "Measure and improve key performance indicators in healthcare delivery"
      ]
   };
   
   // Generic objectives for topics without specific ones
   const defaultObjectives = [
      "Master the simulation tool and its application to the specific domain",
      "Develop analytical skills through model creation and validation",
      "Apply statistical methods to interpret simulation results",
      "Learn to communicate technical findings to non-technical audiences"
   ];
   
   return objectives[topicName] || defaultObjectives;
},

// Get tool resources
getTopicResources(tool) {
   const resources = {
      "Python": [
         { title: "SimPy Documentation", url: "https://simpy.readthedocs.io/" },
         { title: "Python for Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" }
      ],
      "MATLAB": [
         { title: "MATLAB Simulation Documentation", url: "https://www.mathworks.com/help/simulink/" },
         { title: "MATLAB Onramp Tutorial", url: "https://www.mathworks.com/learn/tutorials/matlab-onramp.html" }
      ],
      "Unity": [
         { title: "Unity Simulation Documentation", url: "https://unity.com/products/unity-simulation" },
         { title: "Unity Learn Platform", url: "https://learn.unity.com/" }
      ],
      "ANSYS": [
         { title: "ANSYS Student Resources", url: "https://www.ansys.com/academic/students" },
         { title: "ANSYS Tutorials", url: "https://www.ansys.com/resource-center" }
      ]
   };
   
   // Generic resources for tools without specific ones
   const defaultResources = [
      { title: "Getting Started Guide", url: "Check the official documentation for this tool" },
      { title: "University Library Resources", url: "Access through your student portal" }
   ];
   
   return resources[tool] || defaultResources;
},

// Export topics to CSV
exportToCSV() {
   // Create CSV content
   let csvContent = "Topic Name,Tool,Category,Status,Reserved By\n";
   
   // Add data rows
   this.topics.forEach(topic => {
      const status = topic.reserved ? "Reserved" : "Available";
      const reservedBy = topic.reservedBy || "";
      // Escape commas in fields if needed
      const row = [
         `"${topic.name}"`,
         `"${topic.tool}"`,
         `"${topic.category}"`,
         `"${status}"`,
         `"${reservedBy}"`
      ].join(',');
      csvContent += row + "\n";
   });
   
   // Create download link
   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
   const url = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.setAttribute("href", url);
   link.setAttribute("download", "simulation_topics.csv");
   document.body.appendChild(link);
   
   // Trigger download and clean up
   link.click();
   document.body.removeChild(link);
   this.showNotification("Topics exported to CSV successfully!");
},

// Export topics to JSON
exportToJSON() {
   // Create a simplified version of the topics
   const exportData = this.topics.map(topic => ({
      name: topic.name,
      tool: topic.tool,
      category: topic.category,
      status: topic.reserved ? "Reserved" : "Available",
      reservedBy: topic.reservedBy || ""
   }));
   
   // Create JSON blob
   const jsonContent = JSON.stringify(exportData, null, 2);
   const blob = new Blob([jsonContent], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   
   // Create download link
   const link = document.createElement("a");
   link.setAttribute("href", url);
   link.setAttribute("download", "simulation_topics.json");
   document.body.appendChild(link);
   
   // Trigger download and clean up
   link.click();
   document.body.removeChild(link);
   this.showNotification("Topics exported to JSON successfully!");
},

// Print topics list
printTopics() {
   const printWindow = window.open('', '_blank');
   
   // Create print-friendly content
   let printContent = `
      <!DOCTYPE html>
      <html>
      <head>
         <title>Simulation Topics List</title>
         <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #4338ca; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #4338ca; color: white; padding: 10px; text-align: left; }
            td { padding: 8px; border-bottom: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
         </style>
      </head>
      <body>
         <h1>Simulation Topics List</h1>
         <p>Generated on ${new Date().toLocaleDateString()}</p>
         
         <table>
            <thead>
               <tr>
                  <th>Topic Name</th>
                  <th>Tool</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Reserved By</th>
               </tr>
            </thead>
            <tbody>
   `;
   
   // Add table rows
   this.topics.forEach(topic => {
      const status = topic.reserved ? "Reserved" : "Available";
      printContent += `
         <tr>
            <td>${topic.name}</td>
            <td>${topic.tool}</td>
            <td>${topic.category}</td>
            <td>${status}</td>
            <td>${topic.reservedBy || "—"}</td>
         </tr>
      `;
   });
   
   // Close the HTML structure
   printContent += `
            </tbody>
         </table>
         
         <div class="footer">
            Simulation Topics Manager - Created by Nidhal lahcen
         </div>
      </body>
      </html>
   `;
   
   // Write to the print window and print
   printWindow.document.open();
   printWindow.document.write(printContent);
   printWindow.document.close();
   
   // Wait for content to load before printing
   printWindow.onload = function() {
      printWindow.print();
   };
},

      // Get all unique categories
      getCategories() {
         const categories = new Set();
         this.topics.forEach(topic => categories.add(topic.category));
         return Array.from(categories);
      },
      
      // Count topics by category
      getCategoryCount(category) {
         return this.topics.filter(topic => topic.category === category).length;
      },
      
      // Get reserved topics count
      getReservedCount() {
         return this.topics.filter(topic => topic.reserved).length;
      },
      
      // Get popular tools count
      getToolCounts() {
         const toolCounts = {};
         this.topics.forEach(topic => {
            if (!toolCounts[topic.tool]) {
               toolCounts[topic.tool] = 0;
            }
            toolCounts[topic.tool]++;
         });
         
         // Sort by count (descending)
         const sortedTools = {};
         Object.keys(toolCounts)
            .sort((a, b) => toolCounts[b] - toolCounts[a])
            .forEach(key => {
               sortedTools[key] = toolCounts[key];
            });
         
         return sortedTools;
      },
      
      
      // Update the list of reserved topics for the wheel
      updateReservedTopicsForWheel() {
         this.reservedTopicsForWheel = this.topics.filter(topic => topic.reserved);
      },
      
      // Spin the presenter wheel
      spinPresenterWheel() {
         if (this.isSpinning || this.reservedTopicsForWheel.length === 0) return;
         
         this.isSpinning = true;
         this.selectedPresenter = null;
         
         // Calculate a random rotation between 5-10 full rotations plus a random angle
         const minRotations = 5;
         const maxRotations = 10;
         const randomRotations = minRotations + Math.random() * (maxRotations - minRotations);
         const randomAngle = Math.floor(Math.random() * 360);
         const totalRotation = (randomRotations * 360) + randomAngle;
         
         // Get the wheel element and apply rotation
         const wheel = this.$refs.presenterWheel;
         wheel.style.transform = `rotate(${totalRotation}deg)`;
         
         // After spinning is complete, determine the selected topic
         setTimeout(() => {
            // Calculate which topic was selected based on final rotation
            const normalizedRotation = totalRotation % 360;
            const sliceAngle = 360 / this.reservedTopicsForWheel.length;
            const selectedIndex = Math.floor(normalizedRotation / sliceAngle);
            const adjustedIndex = (this.reservedTopicsForWheel.length - selectedIndex) % this.reservedTopicsForWheel.length;
            
            this.selectedPresenter = this.reservedTopicsForWheel[adjustedIndex];
            this.isSpinning = false;
            
            // Add confetti effect for the winner
            this.celebrateWinner();
         }, this.spinDuration);
      },
      
      // Celebrate the selected presenter with a confetti effect
      celebrateWinner() {
         // Create and append confetti elements to the DOM
         const confettiCount = 100;
         const container = document.createElement('div');
         container.className = 'fixed inset-0 pointer-events-none z-50';
         document.body.appendChild(container);
         
         for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = Math.floor(Math.random() * 360);
            const left = Math.random() * 100;
            const size = Math.random() * 10 + 5;
            
            confetti.className = 'absolute animate__animated animate__fadeInUp animate__fadeOutDown';
            confetti.style.cssText = `
               left: ${left}%;
               top: -5%;
               width: ${size}px;
               height: ${size}px;
               background-color: hsl(${color}, 70%, 60%);
               border-radius: 50%;
               animation-duration: ${Math.random() * 2 + 2}s;
               animation-delay: ${Math.random() * 0.5}s;
            `;
            
            container.appendChild(confetti);
         }
         
         // Remove confetti after 4 seconds
         setTimeout(() => {
            document.body.removeChild(container);
         }, 4000);
      },
      
      // Filter topics based on search query and filters
      filterTopics() {
         const query = this.searchQuery.toLowerCase();
         this.filteredTopics = this.topics.filter(topic => {
            const matchesSearch = 
               topic.name.toLowerCase().includes(query) || 
               topic.category.toLowerCase().includes(query) ||
               topic.tool.toLowerCase().includes(query) ||
               (topic.reservedBy && topic.reservedBy.toLowerCase().includes(query));
            
            const matchesStatus = 
               this.filterStatus === "all" || 
               (this.filterStatus === "available" && !topic.reserved) ||
               (this.filterStatus === "reserved" && topic.reserved);
            
            const matchesCategory =
               this.filterCategory === "all" ||
               topic.category === this.filterCategory;
            
            return matchesSearch && matchesStatus && matchesCategory;
         });
      },
      
      // Reserve a topic
      reserveTopic(index) {
         this.selectedTopicIndex = index;
         this.selectedTopic = this.filteredTopics[index];
         this.showModal = true;
      },
      
      // Confirm reservation
      confirmReservation() {
         if (this.studentName.trim() === "") return;
         
         // Find the actual topic in the original array
         const topicIndex = this.topics.findIndex(t => t.name === this.selectedTopic.name);
         
         // Update the original topic
         this.topics[topicIndex].reserved = true;
         this.topics[topicIndex].reservedBy = this.studentName;
         
         // Update the filtered topic (current view)
         this.filteredTopics[this.selectedTopicIndex].reserved = true;
         this.filteredTopics[this.selectedTopicIndex].reservedBy = this.studentName;
         
         // Update the wheel with the newly reserved topic
         this.updateReservedTopicsForWheel();
         
         // Show success notification
         this.showNotification(`You've successfully reserved "${this.selectedTopic.name}"!`);
         
         // Close modal and reset form
         this.showModal = false;
         this.studentName = "";
      },
      
      // Show notification
      showNotification(message) {
         // Create notification element
         const notification = document.createElement('div');
         notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg animate__animated animate__fadeInUp';
         notification.textContent = message;
         
         // Add to DOM
         document.body.appendChild(notification);
         
         // Remove after 3 seconds
         setTimeout(() => {
            notification.classList.remove('animate__fadeInUp');
            notification.classList.add('animate__fadeOutDown');
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                  document.body.removeChild(notification);
            }, 500);
         }, 3000);
      }
   };
}