import ContentLoader from 'react-content-loader'


export default function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={292}
      height={485}
      viewBox="0 0 292 485"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="146" cy="130" r="130" />
      <rect x="46" y="280" rx="0" ry="0" width="200" height="28" />
      <rect x="0" y="325" rx="10" ry="10" width="292" height="85" />
      <rect x="10" y="434" rx="0" ry="0" width="65" height="25" />
      <rect x="160" y="426" rx="22" ry="22" width="132" height="40" />
    </ContentLoader>
  )
}
