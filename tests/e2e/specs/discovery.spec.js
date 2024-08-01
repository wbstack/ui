const Discovery = require('../pageobjects/discovery.page')

describe('Discovery page', () => {
  beforeEach(async () => {
    await Discovery.open()
    await browser.setWindowSize(1360, 973)
  })

  it('should render header and footer', async () => {
    const header = await Discovery.header
    const footer = await Discovery.footer

    expect(await header.isDisplayed()).toBe(true)
    expect(await header.getText()).toStrictEqual('A tour of Wikibases in the cloud')
    expect(await footer.isDisplayed()).toBe(true)
  })

  it('should paginate results', async () => {
    const page = await Discovery.pagination
    expect(await page.isDisplayed()).toBe(true)
  })

  it('should filter by descending page count by default', async () => {
    const sortValue = await Discovery.sortValue
    const cardWithMostPages = await Discovery.getCardByPageCount(49)
    const cardWithLeastPages = await Discovery.getCardByPageCount(0)

    expect(await sortValue.getText()).toStrictEqual('No. of pages ↓')
    expect(await cardWithMostPages.isDisplayed()).toBe(true)
    expect(await cardWithLeastPages.isDisplayed()).toBe(false)
  })

  describe('should support filtering', () => {
    const cases = [
      {
        description: 'in descending alphabetical order',
        order: 'Alphabetically ↓',
        cards: {
          first: 'seededsite-9',
          last: 'seededsite-32'
        }
      },
      {
        description: 'in ascending alphabetical order',
        order: 'Alphabetically ↑',
        cards: {
          first: 'seededsite-10',
          last: 'seededsite-31'
        }
      },
      {
        description: 'by descending page count',
        order: 'No. of pages ↓',
        cards: {
          first: 'seededsite-49',
          last: 'seededsite-26'
        }
      }
    ]

    cases.forEach(async ({ description, order, cards }) => {
      await it(description, async () => {
        await Discovery.setSortValue(order)

        const firstCard = await Discovery.getFirstCard()
        const lastCard = await Discovery.getLastCard()

        expect(await firstCard.name).toStrictEqual(cards.first)
        expect(await lastCard.name).toStrictEqual(cards.last)
      })
    })
  })

  it('should filter out empty instances by default', async () => {
    await Discovery.setSortValue('Alphabetically ↑')

    const excludeEmptyCheckbox = await Discovery.excludeEmptyCheckbox
    const cards = await Discovery.cards
    await cards.waitForDisplayed({ timeout: 5000 })
    const cardWithLeastPages = await Discovery.getCardByPageCount(0)

    expect(await excludeEmptyCheckbox.isSelected()).toBe(true)
    expect(await cardWithLeastPages.isDisplayed()).toBe(false)
  })

  it('should support including empty instances', async () => {
    await Discovery.setSortValue('Alphabetically ↑')

    const excludeEmptyCheckbox = await Discovery.excludeEmptyCheckbox
    await excludeEmptyCheckbox.waitForExist({ timeout: 5000 })
    const excludeEmptyCheckboxWrapper = await excludeEmptyCheckbox.parentElement()
    await excludeEmptyCheckboxWrapper.click()

    const cards = await Discovery.cards
    await cards.waitForDisplayed({ timeout: 5000 })
    const cardWithLeastPages = await Discovery.getCardByPageCount(0)

    expect(await excludeEmptyCheckbox.isSelected()).toBe(false)
    expect(await cardWithLeastPages.isDisplayed()).toBe(true)
  })

  it('should render card details', async () => {
    const { name, pages } = await Discovery.getFirstCard()

    expect(name).toStrictEqual('seededsite-49')
    expect(pages).toStrictEqual('No. of pages: 49')
  })

  it('should open new tab when card is clicked', async () => {
    const firstCard = await Discovery.firstCard
    await firstCard.click()

    const url = 'https://seededsite-49.nodomain.example/'
    await browser.switchWindow(url)
    await expect(browser).toHaveUrlContaining(url, { wait: 5000 })
  })
})
