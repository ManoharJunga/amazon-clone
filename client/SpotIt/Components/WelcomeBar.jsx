import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function WelcomeBar() {
  return (
    <div style={styles.bar}>
      <div style={styles.logoContainer}>
        Welcome to SpotIt
      </div>
      <div style={styles.spacer} />
      <div style={styles.right}>
        <LocationOnIcon style={styles.icon} fontSize="small" htmlColor="#3300FF" />
        Location
      </div>
      <div style={styles.verticalLine}></div>
      <div style={styles.right}>
        <LocalOfferIcon style={styles.icon} fontSize="small" htmlColor="#3300FF" />
        All Offers
      </div>
    </div>
  );
}

export default WelcomeBar;

const styles = {
  bar: {
    fontSize: '13px',
    display: 'flex',
    color: '#666666',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 150,
    paddingRight: 150,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  right: {
    marginLeft: 16,
    display: 'flex',
    alignItems: 'center',
  },
  verticalLine: {
    height: '30px',
    width: 1.5,
    backgroundColor: '#D9D9D9',
    marginLeft: 16,
  },
  icon: {
    marginRight: '5px',
  },
};
