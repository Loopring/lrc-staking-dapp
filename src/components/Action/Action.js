import React, { useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import extProps from './propTypes';
import depositImg from '../../assets/images/action/deposit.png';
import claimImg from '../../assets/images/action/claim.png';
import withdrawImg from '../../assets/images/action/withdraw.png';
import ActionButton from './ActionButton';
import DepositStepper from './DepositStepper';
import ClaimStepper from './ClaimStepper';
import WithdrawStepper from './WithdrawStepper';
import { safeAmountDecimal } from '../../utils/BigAmountHelper';

/*
 *
 * Display all interaction with smart contract
 * stake(deposit), claim, withdraw
 * Action can be locked if watch-only or if stake younger than 90 days
 *
 */

const Action = React.memo(({
  classes, messages, onApprove, onStake, onClaim, onWithdraw,
  allowance, stake, claim, withdraw, balance, approve, isLocked,
  pendingReward, yourStake, withdrawTime, claimTime,
}) => {
  const [isShowDeposit, setIsShowDeposit] = useState(false);
  const [isShowClaim, setIsShowClaim] = useState(false);
  const [isShowWithdraw, setIsShowWithdraw] = useState(false);

  if (isShowDeposit || isShowClaim || isShowWithdraw) {
    return (
      <>
        <IconButton
          variant="outlined"
          color="primary"
          className={classes.btnBack}
          onClick={() => {
            setIsShowDeposit(false);
            setIsShowClaim(false);
            setIsShowWithdraw(false);
          }}
        >
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </IconButton>
        {
        isShowDeposit && (
          <DepositStepper
            messages={messages}
            maxAmount={safeAmountDecimal(balance.value)}
            allowance={allowance}
            onApprove={onApprove}
            onStake={onStake}
            stake={stake}
            approve={approve}
            onDone={() => setIsShowDeposit(false)}
          />

        )
      }
        {
        isShowClaim && (
          <ClaimStepper
            messages={messages}
            pendingReward={safeAmountDecimal(pendingReward)}
            onClaim={onClaim}
            claim={claim}
            onDone={() => setIsShowClaim(false)}
          />

        )
      }
        {
        isShowWithdraw && (
          <WithdrawStepper
            messages={messages}
            maxAmount={safeAmountDecimal(yourStake)}
            onWithdraw={onWithdraw}
            withdraw={withdraw}
            onDone={() => setIsShowWithdraw(false)}
          />

        )
      }
      </>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3} />
      <Grid item xs={12} md={6}>
        <ActionButton
          isLocked={true}
          messages={messages}
          title={messages.Stake}
          image={depositImg}
          description={messages['This function has been disabled. Please join Loopring AMM Liquidity Mining for more rewards.']}
          waitingTime={0}
        />
      </Grid>
      <Grid item xs={12} md={3} />
      <Grid item xs={12} md={6}>
        <ActionButton
          messages={messages}
          isLocked={true}
          onClick={() => setIsShowClaim(true)}
          title={messages.Claim}
          image={claimImg}
          description={messages['This function has been disabled.']}
          waitingTime={claimTime}
        />
      </Grid>

      <Grid item xs={12} md={6} className={classes.addMarginMobile}>
        <ActionButton
          messages={messages}
          isLocked={isLocked}
          onClick={() => setIsShowWithdraw(true)}
          title={messages.Withdraw}
          image={withdrawImg}
          description={messages['Withdraw your stake.']}
          waitingTime={withdrawTime}
        />
      </Grid>
    </Grid>
  );
});

Action.propTypes = extProps;

export default Action;
