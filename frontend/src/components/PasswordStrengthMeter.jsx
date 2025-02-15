import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = testResult.score * 100 / 4;
  if (num === 0) {
    var widthNum = 100
  }
  else {
    var widthNum = num
  }

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return 'Very weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fear';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  }

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  }

  const changePasswordColor = () => ({
    width: `${widthNum}%`,
    background: funcProgressColor(),
  })

  return (
    <>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style={changePasswordColor()}>
          <span>{createPassLabel()}</span>
        </div>
      </div>
    </>
  )
}

export default PasswordStrengthMeter