import Image from "next/image"
import HeadingText from "@/components/heading-text"
import { featureCards } from "@/config/contents"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"


export default function FeatureCards() {
  return (
    <section style={{ backgroundColor: '#f8fafc' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem',
        textAlign: 'center'
      }}>
        {featureCards.header || featureCards.subheader ? (
          <HeadingText subtext={featureCards.subheader}>
            {featureCards.header}
          </HeadingText>
        ) : null}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {featureCards.content.map((cards) => {
            const Icon = Icons[cards.icon || "blank"]

            return (
              <Card
                key={cards.text}
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '2rem',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ display: 'flex' }}>
                  <Icon style={{ height: '6rem', width: '6rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <CardTitle>{cards.text}</CardTitle>
                  <CardDescription>{cards.subtext}</CardDescription>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
