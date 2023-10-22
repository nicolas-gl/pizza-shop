import ContentLoader from 'react-content-loader'


export default function Skeleton() {
  const resolution = window.screen.availWidth;

  if (resolution > 700) {
    return (<ContentOver700px />);

  } else if (resolution > 350) {
    return (<ContentOver350px />);

  } else {
    return (<ContentUnder350px />);
  }
}


function ContentOver700px() {
  return (
    <ContentLoader
      speed={2}
      width={292}
      height={480}
      viewBox="0 0 292 480"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="146" cy="130" r="130" />
      <rect x="46" y="280" rx="0" ry="0" width="200" height="28" />
      <rect x="0" y="327" rx="10" ry="10" width="292" height="83" />
      <rect x="10" y="434" rx="0" ry="0" width="65" height="25" />
      <rect x="155" y="426" rx="22" ry="22" width="132" height="40" />
    </ContentLoader>
  )
}

function ContentOver350px() {
  return (
    < ContentLoader
      speed={2}
      width={292}
      height={395}
      viewBox="0 0 292 395"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="146" cy="130" r="130" />
      <rect x="79" y="266" rx="0" ry="0" width="134" height="18" />
      <rect x="0" y="290" rx="10" ry="10" width="292" height="61" />
      <rect x="10" y="365" rx="0" ry="0" width="42" height="16" />
      <rect x="187" y="358" rx="17" ry="17" width="100" height="30" />
    </ContentLoader >
  )
}

function ContentUnder350px() {
  return (
    <ContentLoader
      speed={2}
      width={222}
      height={290}
      viewBox="0 0 222 290"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="111" cy="78" r="78" />
      <rect x="44" y="161" rx="0" ry="0" width="134" height="18" />
      <rect x="0" y="185" rx="10" ry="10" width="222" height="61" />
      <rect x="10" y="260" rx="0" ry="0" width="42" height="16" />
      <rect x="117" y="253" rx="17" ry="17" width="100" height="30" />
    </ContentLoader>
  )
}
