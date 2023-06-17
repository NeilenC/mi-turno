import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './userInfo';

const branchesProvider = ({ children }) => {
  return <div>{children}</div>;
};

export default branchesProvider;
