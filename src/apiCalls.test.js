import * as API from './apiCalls'

describe('API', () => {
  let mockFilmsData
  let mockCharacterData
  let mockVehicleData
  let url
  let mockCharacterDataEnd
  let mockCharacterData2
  let mockCharacterData2End
  let mockPlanetData
  let mockNestedReturnArrayOfObjects
  let mockResidentData
  let mockResidentArray

  describe('fetchScroll', () => {
    beforeEach(() => {
      mockFilmsData = [
        {
          title: 'A New Hope',
          text: 'A Long Time Ago...',
          date: '1976',
          somethingToRemove: 'we do not want this when cleaned, but good for fetching'
        },
        {
          title: 'The Empire',
          text: 'A Long Time Ago... but not so long as the last one',
          date: '1979',
          somethingToRemove: 'we do not want this when cleaned, but good for fetching'
        }
      ]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFilmsData)
      }))
    })

    it('calls fetch with the correct params', () => {
      url = 'https://swapi.co/api/films'
      const expected = 'https://swapi.co/api/films'
      API.fetchScroll(url)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should return a list of movies if everything is okay', async () => {
      const expected = mockFilmsData
      const result = await API.fetchScroll(url)
      expect(result).toEqual(expected)
    })

    it('should throw an error if everything is not okay', async () => {
      const expectedError = Error('Yoda- ERROR has detected, API returned okay NOT')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          okay: false
        })
      })
      await expect(API.fetchScroll(url)).rejects.toEqual(expectedError)
    })
  })

  describe('fetchCharacters', () => {
    beforeEach(() => {
      mockCharacterData = {
        results: [
          {
            homeworld: 'https://swapi.co/api/planets/1/',
            population: 'https://swapi.co/api/planets/1/',
            species: 'https://swapi.co/api/species/1/',
            name: 'bob'
          },
          {
            homeworld: 'https://swapi.co/api/planets/1/',
            population: 'https://swapi.co/api/planets/1/',
            species: 'https://swapi.co/api/species/1/',
            name: 'we call him alien'
          }
        ]
      }
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCharacterData)
      }))
    })

    it('calls fetch with the correct params', () => {
      url = 'https://swapi.co/api/people'
      const expected = 'https://swapi.co/api/people'
      API.fetchCharacters(url)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should return a list of Characters, if response is okay', async () => {
      const expected = mockCharacterData
      const result = await API.fetchCharacters(url)
      expect(result).toEqual(expected)
    })

    it('should return an error message if response was not okay', async () => {
      const expectedError = Error('Chewbacca- AGERUYEHSFG: translation, Error, API returned not okay')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          okay: false
        })
      })
      await expect(API.fetchCharacters(url)).rejects.toEqual(expectedError)
    })
  })

  describe('fetchCharactersHomeWorld', () => {
    beforeEach(() => {
      mockCharacterData = {
        results: [
          {
            homeworld: 'https://swapi.co/api/planets/1/',
            population: 'https://swapi.co/api/planets/1/',
            species: 'https://swapi.co/api/species/1/',
            name: 'bob'
          },
          {
            homeworld: 'https://swapi.co/api/planets/1/',
            population: 'https://swapi.co/api/planets/1/',
            species: 'https://swapi.co/api/species/1/',
            name: 'we call him alien'
          }
        ]
      }
      mockCharacterDataEnd = [
        {
          homeworld: 'Earth',
          population: '123456789',
          species: 'https://swapi.co/api/species/1/',
          name: 'bob'
        },
        {
          homeworld: 'Venus',
          population: '32',
          species: 'https://swapi.co/api/species/1/',
          name: 'we call him alien'
        }
      ]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCharacterDataEnd)
      }))
    })
    it('calls fetch with the correct params', () => {
      const expected = 'https://swapi.co/api/planets/1/'
      API.fetchCharactersHomeWorld(mockCharacterData)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should return a list of Characters that now have homeworld and population endpoints, if the response is okay', async () => {
      const expected = mockCharacterDataEnd.map(character => Object.keys(character))
      const mockFetchCall = await API.fetchCharactersHomeWorld(mockCharacterData)
      const result = mockFetchCall.map(call => Object.keys(call))
      expect(result).toEqual(expected)
    })

    it('should return an error message if response was not okay', async () => {
      const expectedError = Error('Chewbacca- 2AGERUYEHSFG: translation, Error, API2 returned not okay')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          okay: false
        })
      })
      await expect(API.fetchCharactersHomeWorld(mockCharacterData)).rejects.toEqual(expectedError)
    })
  })

  describe('fetchCharacterSpecies', () => {
    beforeEach(() => {
      mockCharacterData2 = [
        {
          homeworld: 'Earth',
          population: '123456789',
          species: 'https://swapi.co/api/species/1/',
          name: 'bob'
        },
        {
          homeworld: 'Venus',
          population: '32',
          species: 'https://swapi.co/api/species/1/',
          name: 'we call him alien'
        }
      ]
      mockCharacterData2End = [
        {
          homeworld: 'Earth',
          population: '123456789',
          species: 'human',
          name: 'bob'
        },
        {
          homeworld: 'Venus',
          population: '32',
          species: 'K-9',
          name: 'we call him alien'
        }
      ]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCharacterData2End)
      }))
    })

    it('calls fetch with the correct params', () => {
      const expected = 'https://swapi.co/api/species/1/'
      API.fetchCharactersSpecies(mockCharacterData2)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should return a list of Characters that now has species endpoints, if the response is okay', async () => {
      const expected = mockCharacterData2End.map(character => Object.keys(character))
      const mockFetchCall = await API.fetchCharactersSpecies(mockCharacterData2)
      const result = mockFetchCall.map(call => Object.keys(call))
      expect(result).toEqual(expected)
    })

    it('shoiuld return an error message if response was not okay', async () => {
      const expectedError = Error('Chewbacca- 3AGERUYEHSFG: translation, Error, API3 returned not okay')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          okay: false
        })
      })
      await expect(API.fetchCharactersSpecies(mockCharacterData2)).rejects.toEqual(expectedError)
    })
  })

  describe('fetchVehicles', () => {
    beforeEach(() => {
      mockVehicleData = [
        {
          Name: 'Ford',
          Model: 'Explorer',
          Class: 'wheeled',
          Passengers: 3,
          somethingToRemove: 'take this out in cleaner'
        },
        {
          Name: 'Ford',
          Model: 'Explorer',
          Class: 'wheeled',
          Passengers: 3,
          somethingToRemove: 'take this out in cleaner'
        }
      ]
      url = 'https://swapi.co/api/vehicles'
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockVehicleData)
      }))
    })

    it('should call fetch with the correct params', () => {
      const expected = 'https://swapi.co/api/vehicles'
      API.fetchVehicles(url)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should return a list of Vehicles if the response is ok', async () => {
      const expected = mockVehicleData
      const result = await API.fetchVehicles(url)
      expect(result).toEqual(expected)
    })

    it('should return an error message if response was not okay', async () => {
      const expectedError = Error('Obi-Wan Kenobi says Error, these are not the droids you are looking for')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          okay: false
        })
      })
      await expect(API.fetchVehicles(url)).rejects.toEqual(expectedError)
    })
  })

  describe('fetchPlanets', () => {
    beforeEach(() => {
      mockPlanetData = {
        results: [
          {
            name: 'Alderaan',
            population: 2000000000,
            residents: [
              'https://swapi.co/api/people/5/',
              'https://swapi.co/api/people/68/',
              'https://swapi.co/api/people/81/'
            ],
            terrain: 'grasslands, mountains'
          },
          {
            name: 'Saturn',
            population: 200,
            residents: [
              'https://swapi.co/api/people/5/',
              'https://swapi.co/api/people/68/',
              'https://swapi.co/api/people/81/'
            ],
            terrain: 'grasslands, mountains'
          }
        ]
      }

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPlanetData)
      }))
    })

    it('calls fetch with the correct params', () => {
      url = 'https://swapi.co/api/planets'
      const expected = 'https://swapi.co/api/planets'
      API.fetchPlanets(url)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should return a list of Planets, if response is okay', async () => {
      const expected = mockPlanetData
      const result = await API.fetchPlanets(url)
      expect(result).toEqual(expected)
    })

    it('should return an error message if response was not okay', async () => {
      const expectedError = Error('Chewbacca- AGERUYEHSFG: translation, Error, planet not okay')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })
      await expect(API.fetchPlanets(url)).rejects.toEqual(expectedError)
    })
  })

  describe('fetchPlanetResidents', () => {
    beforeEach(() => {
      mockResidentData = [
        'https://swapi.co/api/people/5/',
        'https://swapi.co/api/people/5/',
        'https://swapi.co/api/people/5/'
      ]
      mockResidentArray = {
        residents:
        [
          {
            name: 'robert', somethingelse: 'x'
          }, {
            name: 'susan', somethingelse: 'x'
          }, {
            name: 'joe', somethingelse: 'x'
          }
        ]
      }

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResidentArray)
      }))
    })

    it('fetchPlanetResidents should be called with the correct params', () => {
      const expected = 'https://swapi.co/api/people/5/'
      API.fetchPlanetResidents(mockResidentData)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it.skip('should return a list of residents, if the response is okay', async () => {
      const expected = ['robert', 'susan', 'joe']
      const result = await API.fetchPlanetResidents(mockResidentData)
      expect(result).toEqual(expected)
    })

    it('should return an error message if response was not okay', async () => {
      const expectedError = Error('Chewbacca- AGERUYEHSFG: translation, Error, planet2 not okay')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })
      await expect(API.fetchPlanetResidents(mockResidentData)).rejects.toEqual(expectedError)
    })
  })

  describe('fetchNestedInfoPlanets', () => {
    beforeEach(() => {
      mockPlanetData = {
        results: [
          {
            name: 'Alderaan',
            population: 2000000000,
            residents: [
              'https://swapi.co/api/people/5/',
              'https://swapi.co/api/people/5/',
              'https://swapi.co/api/people/5/'
            ],
            terrain: 'grasslands, mountains',
            other: 'something that gets removed in cleaner'
          },
          {
            name: 'Saturn',
            population: 200,
            residents: [
              'https://swapi.co/api/people/5/',
              'https://swapi.co/api/people/5/',
              'https://swapi.co/api/people/5/'
            ],
            terrain: 'grasslands, mountains',
            other: 'something that gets removed in cleaner'
          }
        ]
      }
      mockNestedReturnArrayOfObjects = [
        {
          name: 'Alderaan',
          population: 2000000000,
          residents: ['robert', 'susan', 'joel'],
          terrain: 'grasslands, mountains',
          other: 'something that gets removed in cleaner'
        },
        {
          name: 'Saturn',
          population: 200,
          residents: ['bob', 'sally', 'joe'],
          terrain: 'grasslands, mountains',
          other: 'something that gets removed in cleaner'
        }
      ]
      const mockNestedReturnResidentsArray = {
        residents: ['robert', 'susan', 'joel']
      }
      mockResidentData = [
        'https://swapi.co/api/people/5/',
        'https://swapi.co/api/people/5/',
        'https://swapi.co/api/people/5/'
      ]

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNestedReturnArrayOfObjects)
      }))
    })

    it('should return a list of planetInfo, if the response is okay', async () => {
      const expected = mockNestedReturnArrayOfObjects.map(planets => Object.keys(planets))
      const mockFetchCall = await API.fetchNestedInfoPlanets(mockPlanetData)
      const result = mockFetchCall.map(call => Object.keys(call))
      expect(result).toEqual(expected)
    })
  })
})
