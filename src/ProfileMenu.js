// ProfileMenu.js 
import React, { useState } from 'react'; 
  
const ProfileMenu = () => { 
  const [open, setOpen] = useState(false); 
  const [subscription, setSubscription] = useState('Premium'); 
  
  const toggleMenu = () => setOpen(prev => !prev); 
  
  return ( 
    <div style={{ position: 'relative', display: 'inline-block' }}> 
      <button 
        onClick={toggleMenu} 
        style={{ 
          backgroundColor: '#333', 
          color: '#fff', 
          border: 'none', 
          padding: '8px 12px', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }} 
      > 
        Profile ▾ 
      </button> 
  
      {open && ( 
        <div 
          style={{ 
            position: 'absolute', 
            top: '40px', 
            right: 0, 
            backgroundColor: '#1e1e1e', 
            border: '1px solid #444', 
            borderRadius: '6px', 
            padding: '15px', 
            width: '220px', 
            zIndex: 1000 
          }} 
        > 
          <div style={{ marginBottom: '12px' }}> 
            <label style={{ display: 'block', marginBottom: '6px', color: '#ccc' }}> 
              Subscription Plan: 
            </label> 
            <select 
              value={subscription} 
              onChange={(e) => setSubscription(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '6px', 
                borderRadius: '4px', 
                border: '1px solid #555', 
                backgroundColor: '#2a2a2a', 
                color: '#fff' 
              }} 
            > 
              <option value="Free">Free</option> 
              <option value="Standard">Standard</option> 
              <option value="Premium">Premium</option> 
            </select> 
          </div> 
  
          <hr style={{ borderColor: '#444' }} /> 
  
          <div style={{ marginTop: '12px' }}> 
            <button style={menuButtonStyle}>Settings</button> 
            <button style={menuButtonStyle}>Feedback</button> 
            <button style={menuButtonStyle}>Privacy & Compliance</button> 
          </div> 
        </div> 
      )} 
    </div> 
  ); 
}; 
  
const menuButtonStyle = { 
  display: 'block', 
  width: '100%', 
  backgroundColor: '#444', 
  color: '#fff', 
  border: 'none', 
  padding: '8px', 
  borderRadius: '4px', 
  marginTop: '6px', 
  cursor: 'pointer', 
  textAlign: 'left' 
}; 
  
export default ProfileMenu; 