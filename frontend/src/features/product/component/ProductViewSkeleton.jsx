import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ProductViewSkeleton = () => {
  return (
    <div style={{ display: 'flex', gap: '0 36px', width: '88%', margin: 'auto' }}>
      <div style={{ display: 'flex', width: '65%', gap: '0 26px' }}>
        <div style={{ width: '150px' }}>
          <Skeleton count={4} height={100} style={{ marginBottom: '10px' }} />
        </div>
        <div style={{ width: '100%' }}>
          <Skeleton height={435} style={{ marginBottom: '15px' }} />
        </div>
      </div>
      <div style={{ display: 'flex', width: '35%', gap: '0 20px' }}>
        <div style={{ width: '100%' }}>
          <Skeleton count={4} height={30} style={{ marginBottom: '12px' }} />
          <Skeleton
            circle={true}
            inline={true}
            count={3}
            width={40}
            height={40}
            style={{ margin: '0 6px 6px 0' }}
          />
          <div>
            <Skeleton
              inline={true}
              height={40}
              style={{ margin: '10px 16px 10px 0', width: '60%' }}
            />
            <Skeleton inline={true} height={40} style={{ width: 'calc(40% - 16px)' }} />
          </div>
          <Skeleton inline={true} count={3} height={40} style={{ marginTop: '12px' }} />
          {/* <Skeleton inline={true} height={45} style={{ marginTop: '16px' }} /> */}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductViewSkeleton)
