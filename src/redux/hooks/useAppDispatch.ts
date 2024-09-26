'use client';

import { useDispatch } from 'react-redux';

import type { AppStore } from '../store';

const useAppDispatch = useDispatch.withTypes<AppStore['dispatch']>();

export default useAppDispatch;
