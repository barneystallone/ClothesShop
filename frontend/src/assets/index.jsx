import { lazy } from 'react'

const handlePromise = (promise) => {
  return promise.then((module) => ({ default: module.ReactComponent }))
}
const ShareIcon = lazy(() => handlePromise(import('./images/share.svg')))
const ExchangeIcon = lazy(() => handlePromise(import('./images/exchange.svg')))
const TransportIcon = lazy(() => handlePromise(import('./images/transport.svg')))
const ShopIcon = lazy(() => handlePromise(import('./images/shop.svg')))
const HeartIcon = lazy(() => handlePromise(import('./images/heart.svg')))
const CopyIcon = lazy(() => handlePromise(import('./images/copy.svg')))
const DownIcon = lazy(() => handlePromise(import('./images/down.svg')))
const PlusIcon = lazy(() => handlePromise(import('./images/plus.svg')))
const MinusIcon = lazy(() => handlePromise(import('./images/minus.svg')))
const CloseIcon = lazy(() => handlePromise(import('./images/close.svg')))
const SubtractIcon = lazy(() => handlePromise(import('./images/subtract.svg')))
export {
  ShareIcon,
  ExchangeIcon,
  TransportIcon,
  ShopIcon,
  HeartIcon,
  CopyIcon,
  DownIcon,
  PlusIcon,
  MinusIcon,
  SubtractIcon,
  CloseIcon
}
