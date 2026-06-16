/*
 * Quantum Circuit Visualization and Scroll Effects
 */

(function($) {
    'use strict';

    // Quantum Circuit Renderer
    var QuantumCircuitRenderer = {
        
        // Draw a basic quantum circuit
        drawCircuit: function(canvasId, qubits, gates) {
            var canvas = document.getElementById(canvasId);
            if (!canvas) return;
            
            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            
            // Clear canvas
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            
            var padding = 40;
            var gateWidth = 60;
            var qubitSpacing = (height - 2 * padding) / (qubits - 1);
            var gateSpacing = (width - 2 * padding) / (gates.length + 1);
            
            // Draw qubit lines
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = '#333333';
            
            for (var i = 0; i < qubits; i++) {
                var y = padding + i * qubitSpacing;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
                
                // Label qubits
                ctx.fillText('q' + i, padding - 30, y + 5);
            }
            
            // Draw gates
            for (var g = 0; g < gates.length; g++) {
                var gate = gates[g];
                var x = padding + (g + 1) * gateSpacing;
                
                for (var q = 0; q < qubits; q++) {
                    var y = padding + q * qubitSpacing;
                    
                    if (gate.qubits.indexOf(q) !== -1) {
                        this.drawGate(ctx, x, y, gate.type, gateWidth);
                    }
                }
            }
        },
        
        // Draw individual gate
        drawGate: function(ctx, x, y, type, size) {
            var colors = {
                'H': '#888888',
                'X': '#aaaaaa',
                'Y': '#999999',
                'Z': '#777777',
                'CNOT': '#999999',
                'SWAP': '#888888'
            };
            
            var color = colors[type] || '#888888';
            size = size || 30;
            
            // Draw gate box
            ctx.fillStyle = color;
            ctx.fillRect(x - size/2, y - size/2, size, size);
            
            // Draw border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(x - size/2, y - size/2, size, size);
            
            // Draw gate label
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(type, x, y);
        },
        
        // Draw Bell state circuit (classic quantum circuit)
        drawBellCircuit: function(canvasId) {
            var canvas = document.getElementById(canvasId);
            if (!canvas) return;
            
            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            
            // Clear - dark background
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, width, height);
            
            var padding = 40;
            var qubitSpacing = (height - 2 * padding) / 1;
            var gateWidth = 50;
            
            // Draw qubit lines
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = '#333333';
            
            // Qubit 0
            ctx.beginPath();
            ctx.moveTo(padding, padding);
            ctx.lineTo(width - padding, padding);
            ctx.stroke();
            ctx.fillText('q₀', padding - 30, padding + 5);
            
            // Qubit 1
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(width - padding, height - padding);
            ctx.stroke();
            ctx.fillText('q₁', padding - 30, height - padding + 5);
            
            // H gate on q0
            this.drawGate(ctx, padding + 80, padding, 'H', gateWidth);
            
            // CNOT gate (control on q0, target on q1)
            var cnotX = padding + 160;
            
            // Control dot on q0
            ctx.fillStyle = '#999999';
            ctx.beginPath();
            ctx.arc(cnotX, padding, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Connection line
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cnotX, padding);
            ctx.lineTo(cnotX, height - padding);
            ctx.stroke();
            
            // Target (NOT gate representation)
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cnotX, height - padding, gateWidth/3, 0, 2 * Math.PI);
            ctx.stroke();
            
            // X inside circle
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 2;
            var offset = gateWidth/4;
            ctx.beginPath();
            ctx.moveTo(cnotX - offset, height - padding - offset);
            ctx.lineTo(cnotX + offset, height - padding + offset);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cnotX - offset, height - padding + offset);
            ctx.lineTo(cnotX + offset, height - padding - offset);
            ctx.stroke();
            
            // Measurement symbols
            var measureX = padding + 240;
            
            // Measurement on q0
            ctx.fillStyle = '#777777';
            ctx.fillRect(measureX - gateWidth/2, padding - gateWidth/2, gateWidth, gateWidth);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(measureX - gateWidth/2, padding - gateWidth/2, gateWidth, gateWidth);
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('M', measureX, padding);
            
            // Measurement on q1
            ctx.fillStyle = '#777777';
            ctx.fillRect(measureX - gateWidth/2, height - padding - gateWidth/2, gateWidth, gateWidth);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(measureX - gateWidth/2, height - padding - gateWidth/2, gateWidth, gateWidth);
            ctx.fillStyle = '#000000';
            ctx.fillText('M', measureX, height - padding);
        },
        
        // Draw Quantum Byzantine Agreement Circuit
        drawByzantineCircuit: function(canvasId) {
            var canvas = document.getElementById(canvasId);
            if (!canvas) return;
            
            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            
            // Dark background
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, width, height);
            
            var padding = 40;
            var qubits = 4;
            var qubitSpacing = (height - 2 * padding) / (qubits - 1);
            
            // Draw qubit lines
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = '#cccccc';
            
            for (var i = 0; i < qubits; i++) {
                var y = padding + i * qubitSpacing;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
                ctx.fillText('q' + i, padding - 25, y + 4);
            }
            
            // State preparation - Hadamard on each qubit
            var x = padding + 50;
            for (var i = 0; i < qubits; i++) {
                var y = padding + i * qubitSpacing;
                this.drawGate(ctx, x, y, 'H', 30);
            }
            
            // Entangling circuit - Controlled-Z ladder
            x = padding + 120;
            for (var i = 0; i < qubits - 1; i++) {
                var y1 = padding + i * qubitSpacing;
                var y2 = padding + (i + 1) * qubitSpacing;
                
                // Control dot
                ctx.fillStyle = '#888888';
                ctx.beginPath();
                ctx.arc(x, y1, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // Target dot
                ctx.fillStyle = '#888888';
                ctx.beginPath();
                ctx.arc(x, y2, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // Connection line
                ctx.strokeStyle = '#999999';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x, y1);
                ctx.lineTo(x, y2);
                ctx.stroke();
            }
            
            // Consensus voting layer - RY rotations
            x = padding + 180;
            for (var i = 0; i < qubits; i++) {
                var y = padding + i * qubitSpacing;
                this.drawGate(ctx, x, y, 'RY', 28);
            }
            
            // Multi-qubit measurement (parity check)
            x = padding + 240;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.fillStyle = '#666666';
            
            // Draw a parity gate symbol
            for (var i = 0; i < qubits; i++) {
                var y = padding + i * qubitSpacing;
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
            
            // Connection to output
            ctx.strokeStyle = '#888888';
            ctx.lineWidth = 2;
            var midY = padding + (qubits - 1) * qubitSpacing / 2;
            ctx.beginPath();
            ctx.moveTo(x + 8, padding);
            ctx.lineTo(x + 35, padding + 20);
            ctx.stroke();
            
            // Output indicator
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.fillStyle = '#777777';
            ctx.fillRect(x + 35 - 12, padding + 10 - 8, 24, 16);
            ctx.strokeRect(x + 35 - 12, padding + 10 - 8, 24, 16);
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('O', x + 35, padding + 10);
        },
        
        // Draw Teleportation Circuit (for distributed consensus)
        drawTeleportationCircuit: function(canvasId) {
            var canvas = document.getElementById(canvasId);
            if (!canvas) return;
            
            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            
            // Dark background
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, width, height);
            
            var padding = 40;
            var qubits = 3;
            var qubitSpacing = (height - 2 * padding) / (qubits - 1);
            
            // Draw qubit lines
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = '#cccccc';
            
            for (var i = 0; i < qubits; i++) {
                var y = padding + i * qubitSpacing;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
                if (i === 0) {
                    ctx.fillText('|ψ⟩ input', padding - 50, y + 4);
                } else if (i === 1) {
                    ctx.fillText('Bell pair', padding - 50, y + 4);
                } else {
                    ctx.fillText('Output', padding - 50, y + 4);
                }
            }
            
            // Bell pair preparation
            var x = padding + 50;
            ctx.fillStyle = '#888888';
            ctx.beginPath();
            ctx.arc(x, padding + qubitSpacing, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x, padding + qubitSpacing);
            ctx.lineTo(x, padding + 2 * qubitSpacing);
            ctx.stroke();
            
            // CNOT gates
            x = padding + 110;
            this.drawGate(ctx, x, padding, 'CX', 28);
            
            ctx.fillStyle = '#888888';
            ctx.beginPath();
            ctx.arc(x, padding + qubitSpacing, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Hadamard
            x = padding + 160;
            this.drawGate(ctx, x, padding, 'H', 28);
            
            // Measurements
            x = padding + 210;
            this.drawGate(ctx, x, padding, 'M', 28);
            this.drawGate(ctx, x, padding + qubitSpacing, 'M', 28);
            
            // Classical feedforward (dashed line)
            ctx.strokeStyle = '#888888';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(x + 20, padding);
            ctx.lineTo(x + 60, padding + 2 * qubitSpacing);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Correction unitary
            x = padding + 270;
            this.drawGate(ctx, x, padding + 2 * qubitSpacing, 'U', 28);
        },
        
        // Draw Distributed Consensus Circuit
        drawConsensusCircuit: function(canvasId) {
            var canvas = document.getElementById(canvasId);
            if (!canvas) return;
            
            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            
            // Dark background
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, width, height);
            
            var padding = 30;
            var nodeSpacing = (width - 2 * padding) / 3;
            var centerX = padding + nodeSpacing * 1.5;
            var centerY = height / 2;
            
            // Draw three nodes in triangle
            var nodes = [
                { x: centerX - nodeSpacing * 0.5, y: centerY - 60 },
                { x: centerX - nodeSpacing * 0.5, y: centerY + 60 },
                { x: centerX + nodeSpacing * 0.5, y: centerY }
            ];
            
            // Connection lines between nodes
            ctx.strokeStyle = '#666666';
            ctx.lineWidth = 1.5;
            for (var i = 0; i < nodes.length; i++) {
                for (var j = i + 1; j < nodes.length; j++) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
            
            // Draw nodes with qubits
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = '#999999';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            var labels = ['Node 1', 'Node 2', 'Node 3'];
            for (var i = 0; i < nodes.length; i++) {
                // Node circle
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, 30, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = '#444444';
                ctx.fill();
                
                // Label
                ctx.fillStyle = '#ffffff';
                ctx.fillText(labels[i], nodes[i].x, nodes[i].y);
            }
            
            // Central consensus region
            ctx.strokeStyle = '#777777';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Consensus label
            ctx.font = 'bold 11px Arial';
            ctx.fillStyle = '#888888';
            ctx.fillText('Consensus', centerX, centerY);
            ctx.font = '10px Arial';
            ctx.fillText('Region', centerX, centerY + 14);
            
            // Draw quantum state indicators
            ctx.font = 'bold 12px Arial';
            for (var i = 0; i < nodes.length; i++) {
                var angle = (i / nodes.length) * Math.PI * 2;
                var qx = nodes[i].x + Math.cos(angle) * 40;
                var qy = nodes[i].y + Math.sin(angle) * 40;
                
                ctx.fillStyle = '#999999';
                ctx.fillRect(qx - 8, qy - 8, 16, 16);
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.strokeRect(qx - 8, qy - 8, 16, 16);
                
                ctx.fillStyle = '#000000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 10px Arial';
                ctx.fillText('q', qx, qy);
            }
        },
    };
    
    // Scroll Zoom Handler
    var ScrollZoomHandler = {
        init: function() {
            $(window).on('scroll', this.handleScroll.bind(this));
            this.handleScroll(); // Initial check
        },
        
        handleScroll: function() {
            var sections = $('.quantum-section');
            var windowTop = $(window).scrollTop();
            var windowBottom = windowTop + $(window).height();
            
            sections.each(function() {
                var $section = $(this);
                var sectionTop = $section.offset().top;
                var sectionBottom = sectionTop + $section.outerHeight();
                
                // Calculate visibility percentage
                var visibilityPercent = 0;
                
                if (sectionBottom < windowTop) {
                    // Section is above viewport
                    visibilityPercent = 0;
                } else if (sectionTop > windowBottom) {
                    // Section is below viewport
                    visibilityPercent = 0;
                } else {
                    // Section is visible
                    var visibleTop = Math.max(windowTop, sectionTop);
                    var visibleBottom = Math.min(windowBottom, sectionBottom);
                    var visibleHeight = visibleBottom - visibleTop;
                    var sectionHeight = sectionBottom - sectionTop;
                    visibilityPercent = visibleHeight / sectionHeight;
                }
                
                // Apply zoom effect
                var scale = 0.9 + (visibilityPercent * 0.2); // Scale from 0.9 to 1.1
                var opacity = Math.max(0.5, visibilityPercent);
                
                $section.find('.quantum-content').css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
                
                // Add in-view class for animations
                if (visibilityPercent > 0.3) {
                    $section.addClass('in-view');
                } else {
                    $section.removeClass('in-view');
                }
            });
        }
    };
    
    // Initialize on document ready
    $(document).ready(function() {
        ScrollZoomHandler.init();
        
        // Render circuits
        setTimeout(function() {
            // Byzantine Agreement circuit
            var byzCanvas = document.getElementById('bell-circuit');
            if (byzCanvas) {
                byzCanvas.width = Math.min(700, $(window).width() - 60);
                byzCanvas.height = 280;
                QuantumCircuitRenderer.drawByzantineCircuit('bell-circuit');
            }
            
            // Teleportation circuit
            var telCanvas = document.getElementById('grover-circuit');
            if (telCanvas) {
                telCanvas.width = Math.min(700, $(window).width() - 60);
                telCanvas.height = 220;
                QuantumCircuitRenderer.drawTeleportationCircuit('grover-circuit');
            }

        }, 100);
        
        // Redraw on window resize
        $(window).on('resize', function() {
            var byzCanvas = document.getElementById('bell-circuit');
            if (byzCanvas) {
                byzCanvas.width = Math.min(700, $(window).width() - 60);
                byzCanvas.height = 280;
                QuantumCircuitRenderer.drawByzantineCircuit('bell-circuit');
            }
            
            var telCanvas = document.getElementById('grover-circuit');
            if (telCanvas) {
                telCanvas.width = Math.min(700, $(window).width() - 60);
                telCanvas.height = 220;
                QuantumCircuitRenderer.drawTeleportationCircuit('grover-circuit');
            }
            
            var consCanvas = document.getElementById('bell-circuit-2');
            if (consCanvas) {
                consCanvas.width = Math.min(700, $(window).width() - 60);
                consCanvas.height = 300;
                QuantumCircuitRenderer.drawConsensusCircuit('bell-circuit-2');
            }
        });
    });
    
})(jQuery);
