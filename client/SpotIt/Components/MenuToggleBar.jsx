import React from 'react'

function MenuToggleBar() {
    return (
        <div style={styles.navPanel}>
            <div style={styles.panelContent}>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>
                <span style={panelText}>Mobiles</span>

            </div>
        </div>
    )
}

export default MenuToggleBar;


const styles = {
    navPanel: {
        display: 'flex',
        width: '1536px',
        height: '40px',
        paddingLeft: '11px',
    },
}