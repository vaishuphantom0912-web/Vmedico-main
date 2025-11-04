<template>
  <div style="min-height: 100vh; background-color: #f9fafb; padding: 2rem;">
    <div style="max-width: 1200px; margin: 0 auto;">
      
      <!-- Back Button -->
      <div style="margin-bottom: 2rem;">
        <button 
          @click="goBack" 
          style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: 500; transition: background-color 0.2s;"
          onmouseover="this.style.backgroundColor='#1d4ed8'"
          onmouseout="this.style.backgroundColor='#2563eb'"
        >
          ← Back to Dashboard
        </button>
      </div>

      <!-- Header -->
      <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 2rem; margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">🏥 Nova Diagnostics Laboratory</h1>
        <p style="color: #6b7280; font-size: 1.125rem;">Comprehensive Medical Testing & Diagnostic Services</p>
        <div style="margin-top: 1rem;">
          <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">
            ✅ Active & Certified
          </span>
        </div>
      </div>

      <!-- Quick Stats -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: #2563eb;">2018</div>
          <div style="color: #6b7280;">Established</div>
        </div>
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: #16a34a;">45</div>
          <div style="color: #6b7280;">Staff Members</div>
        </div>
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: #9333ea;">250+</div>
          <div style="color: #6b7280;">Daily Tests</div>
        </div>
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem; text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: #ea580c;">8</div>
          <div style="color: #6b7280;">Departments</div>
        </div>
      </div>

      <!-- Main Information Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
        
        <!-- Basic Information -->
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">📋 Basic Information</h2>
          <div style="space-y: 1rem;">
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Laboratory Name</div>
              <div style="color: #1f2937; font-weight: 500;">Nova Diagnostics Laboratory</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Type</div>
              <div style="color: #1f2937;">Diagnostic Laboratory</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Registration Number</div>
              <div style="color: #1f2937; font-family: monospace;">LAB-REG-2023-001</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">License Number</div>
              <div style="color: #1f2937; font-family: monospace;">LIC-NDL-2023-456</div>
            </div>
            <div>
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Accreditation</div>
              <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                CAP Certified
              </span>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">📞 Contact Information</h2>
          <div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Email</div>
              <div style="color: #1f2937;">info@novadiagnostics.com</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Phone</div>
              <div style="color: #1f2937;">+1 (555) 123-4567</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Emergency Line</div>
              <div style="color: #dc2626; font-weight: 600;">+1 (555) 911-HELP (24/7)</div>
            </div>
            <div>
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Address</div>
              <div style="color: #1f2937;">
                123 Medical Center Drive<br>
                Suite 200<br>
                New York, NY 10001
              </div>
            </div>
          </div>
        </div>

        <!-- Management Team -->
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">👥 Management Team</h2>
          <div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Lab Director</div>
              <div style="color: #1f2937; font-weight: 500;">Dr. Michael Chen, MD</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Quality Manager</div>
              <div style="color: #1f2937;">Dr. Sarah Johnson</div>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">Operations Manager</div>
              <div style="color: #1f2937;">Jennifer Martinez</div>
            </div>
            <div>
              <div style="font-size: 0.875rem; font-weight: 500; color: #6b7280;">IT Administrator</div>
              <div style="color: #1f2937;">David Kim</div>
            </div>
          </div>
        </div>

        <!-- Services Offered -->
        <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">🔬 Services Offered</h2>
          <div>
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <span style="color: #16a34a; margin-right: 0.5rem;">✓</span>
              <span style="color: #1f2937;">Blood Tests & Analysis</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <span style="color: #16a34a; margin-right: 0.5rem;">✓</span>
              <span style="color: #1f2937;">Radiology & Imaging</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <span style="color: #16a34a; margin-right: 0.5rem;">✓</span>
              <span style="color: #1f2937;">Pathology Services</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <span style="color: #16a34a; margin-right: 0.5rem;">✓</span>
              <span style="color: #1f2937;">Microbiology Testing</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
              <span style="color: #16a34a; margin-right: 0.5rem;">✓</span>
              <span style="color: #1f2937;">Molecular Diagnostics</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #16a34a; margin-right: 0.5rem;">✓</span>
              <span style="color: #1f2937;">Emergency Testing (24/7)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleProfile',
  methods: {
    goBack() {
      this.$router.push('/lab-dashboard')
    }
  }
}
</script>