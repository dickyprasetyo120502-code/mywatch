import {
  useEffect,
  useState,
  type ChangeEvent,
} from "react"

import teach1 from "./assets/teach.jpg"
import agen1 from "./assets/agen.jpg"
import lawyer1 from "./assets/lawyer.jpg"
import logo from "./assets/logo.png"

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"

import { ShowForm } from "./components/ShowForm"
import { EpisodeForm } from "./components/EpisodeForm"
import { EpisodeList } from "./components/EpisodeList"
import { ShowCard } from "./components/ShowCard"


interface Show {
  id: number
  title: string
  type: "Movie" | "TV Series"
  genre: string
  year: number
  poster: string
}

interface Episode {
  id: number
  seriesId: number
  season: number
  episodeNumber: number
  title: string
  watched: boolean
}

const initialShows: Show[] = [
  {
    id: 1,
    title: "Teach You a Lesson",
    type: "Movie",
    genre: "Komedi",
    year: 2026,
    poster: teach1,
  },
  {
    id: 2,
    title: "Agen Kim Reactivated",
    type: "TV Series",
    genre: "Drama",
    year: 2026,
    poster: agen1,
  },
  {
    id: 3,
    title: "Lawless Lawyer",
    type: "TV Series",
    genre: "Drama",
    year: 2018,
    poster: lawyer1,
  },
]

const createEpisodes = (
  seriesId: number,
  totalEpisodes: number
): Episode[] => {
  return Array.from(
    { length: totalEpisodes },
    (_, index) => ({
      id: seriesId * 100 + index + 1,
      seriesId,
      season: 1,
      episodeNumber: index + 1,
      title: `Episode ${index + 1}`,
      watched: false,
    })
  )
}

const initialEpisodes: Episode[] = [
  ...createEpisodes(2, 10),
  ...createEpisodes(3, 16),
]

function App() {
  // =========================
  // SHOW DATA
  // =========================

  const [shows, setShows] = useState<Show[]>(() => {
    try {
      const savedShows =
        localStorage.getItem("mywatch-shows")

      if (savedShows) {
        return JSON.parse(savedShows)
      }

      return initialShows
    } catch {
      return initialShows
    }
  })

  // =========================
  // EPISODE DATA
  // =========================

  const [episodes, setEpisodes] =
    useState<Episode[]>(() => {
      try {
        const savedEpisodes =
          localStorage.getItem("mywatch-episodes")

        if (savedEpisodes) {
          return JSON.parse(savedEpisodes)
        }

        return initialEpisodes
      } catch {
        return initialEpisodes
      }
    })

  // =========================
  // SEARCH & FILTER
  // =========================

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  // =========================
  // SELECTED SHOW
  // =========================

  const [selectedShow, setSelectedShow] =
    useState<Show | null>(null)

  const [selectedSeason, setSelectedSeason] =
    useState(1)

  // =========================
  // SHOW FORM
  // =========================

  const [showFormOpen, setShowFormOpen] =
    useState(false)

  const [editingShow, setEditingShow] =
    useState<Show | null>(null)

  // =========================
  // EPISODE FORM
  // =========================

  const [episodeFormOpen, setEpisodeFormOpen] =
    useState(false)

  const [editingEpisode, setEditingEpisode] =
    useState<Episode | null>(null)

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "mywatch-shows",
      JSON.stringify(shows)
    )
  }, [shows])

  useEffect(() => {
    localStorage.setItem(

      "mywatch-episodes",
      JSON.stringify(episodes)
    )
  }, [episodes])

  // =========================
  // ADD / EDIT SHOW
  // =========================

  const saveShow = (
    title: string,
    type: "Movie" | "TV Series",
    genre: string,
    year: number,
    poster: string
  ) => {
    if (!title.trim()) {
      alert("Judul show harus diisi.")
      return
    }

    if (!genre.trim()) {
      alert("Genre harus diisi.")
      return
    }

    if (!year) {
      alert("Tahun harus diisi.")
      return
    }

    if (
      year < 1900 ||
      year > 2100
    ) {
      alert(
        "Tahun harus antara 1900 sampai 2100."
      )
      return
    }

    if (!poster) {
      alert("Poster harus dipilih.")
      return
    }

    if (editingShow) {
      const updatedShow: Show = {
        id: editingShow.id,
        title: title.trim(),
        type,
        genre: genre.trim(),
        year,
        poster,
      }

      setShows((currentShows) =>
        currentShows.map((show) =>
          show.id === editingShow.id
            ? updatedShow
            : show
        )
      )

      setSelectedShow(updatedShow)
    } else {
      const newShow: Show = {
        id: Date.now(),
        title: title.trim(),
        type,
        genre: genre.trim(),
        year,
        poster,
      }

      setShows((currentShows) => [
        ...currentShows,
        newShow,
      ])
    }

    setShowFormOpen(false)
    setEditingShow(null)
  }

  // =========================
  // DELETE SHOW
  // CASCADE DELETE
  // =========================

  const deleteShow = (
    showId: number
  ) => {
    const confirmed =
      window.confirm(
        "Yakin ingin menghapus show ini? Semua episode milik show ini juga akan dihapus."
      )

    if (!confirmed) {
      return
    }

    setShows((currentShows) =>
      currentShows.filter(
        (show) =>
          show.id !== showId
      )
    )

    setEpisodes((currentEpisodes) =>
      currentEpisodes.filter(
        (episode) =>
          episode.seriesId !== showId
      )
    )

    setSelectedShow(null)
  }

  // =========================
  // ADD / EDIT EPISODE
  // =========================

  const saveEpisode = (
    episodeNumber: number,
    title: string,
    season: number
  ) => {
    if (!episodeNumber) {
      alert(
        "Nomor episode harus diisi."
      )
      return
    }

    if (!title.trim()) {
      alert(
        "Judul episode harus diisi."
      )
      return
    }

    if (episodeNumber <= 0) {
      alert(
        "Nomor episode harus lebih dari 0."
      )
      return
    }

    if (!selectedShow) {
      return
    }

    if (editingEpisode) {
      setEpisodes((currentEpisodes) =>
        currentEpisodes.map(
          (episode) =>
            episode.id ===
            editingEpisode.id
              ? {
                  ...episode,
                  episodeNumber,
                  title: title.trim(),
                  season,
                }
              : episode
        )
      )
    } else {
      const newEpisode: Episode = {
        id: Date.now(),
        seriesId: selectedShow.id,
        season,
        episodeNumber,
        title: title.trim(),
        watched: false,
      }

      setEpisodes((currentEpisodes) => [
        ...currentEpisodes,
        newEpisode,
      ])
    }

    setEpisodeFormOpen(false)
    setEditingEpisode(null)
  }

  // =========================
  // DELETE EPISODE
  // =========================

  const deleteEpisode = (
    episodeId: number
  ) => {
    const confirmed =
      window.confirm(
        "Yakin ingin menghapus episode ini?"
      )

    if (!confirmed) {
      return
    }

    setEpisodes((currentEpisodes) =>
      currentEpisodes.filter(
        (episode) =>
          episode.id !== episodeId
      )
    )
  }

  // =========================
  // WATCHED
  // =========================

  const toggleWatched = (
    episodeId: number
  ) => {
    setEpisodes((currentEpisodes) =>
      currentEpisodes.map((episode) =>
        episode.id === episodeId
          ? {
              ...episode,
              watched: !episode.watched,
            }
          : episode
      )
    )
  }

  // =========================
  // FILTERED SHOWS
  // =========================

  const filteredShows =
    shows.filter((show) => {
      const matchesSearch =
        show.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesFilter =
        filter === "All" ||
        show.type === filter

      return (
        matchesSearch &&
        matchesFilter
      )
    })

  // =========================
  // SELECTED EPISODES
  // =========================

  const selectedEpisodes =
    episodes.filter(
      (episode) =>
        episode.seriesId ===
          selectedShow?.id &&
        episode.season ===
          selectedSeason
    )

  const watchedEpisodes =
    selectedEpisodes.filter(
      (episode) =>
        episode.watched
    )

  // =========================
  // PROGRESS
  // =========================

  const progress =
    selectedEpisodes.length > 0
      ? Math.round(
          (watchedEpisodes.length /
            selectedEpisodes.length) *
            100
        )
      : 0

  // =========================
  // POSTER UPLOAD
  // =========================

  const handlePosterUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      alert(
        "Poster harus berupa file gambar."
      )
      return
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Ukuran poster maksimal 2 MB."
      )
      return
    }

    const reader =
      new FileReader()

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        setPosterInput(
          reader.result
        )
      }
    }

    reader.readAsDataURL(file)
  }

  // =========================
  // FORM STATE
  // =========================

  const [titleInput, setTitleInput] =
    useState("")

  const [typeInput, setTypeInput] =
    useState<
      "Movie" | "TV Series"
    >("Movie")

  const [genreInput, setGenreInput] =
    useState("")

  const [yearInput, setYearInput] =
    useState("")

  const [posterInput, setPosterInput] =
    useState("")

  const [episodeNumberInput, setEpisodeNumberInput] =
    useState("")

  const [episodeTitleInput, setEpisodeTitleInput] =
    useState("")

  const [episodeSeasonInput, setEpisodeSeasonInput] =
    useState("1")

  // =========================
  // OPEN ADD SHOW
  // =========================

  const openAddShow = () => {
    setEditingShow(null)

    setTitleInput("")
    setTypeInput("Movie")
    setGenreInput("")
    setYearInput("")
    setPosterInput("")

    setShowFormOpen(true)
    setSelectedShow(null)
  }

  // =========================
  // OPEN EDIT SHOW
  // =========================

  const openEditShow = (
    show: Show
  ) => {
    setEditingShow(show)

    setTitleInput(show.title)
    setTypeInput(show.type)
    setGenreInput(show.genre)
    setYearInput(
      String(show.year)
    )
    setPosterInput(show.poster)

    setShowFormOpen(true)
    setSelectedShow(null)
  }

  // =========================
  // SUBMIT SHOW FORM
  // =========================

  const handleShowSubmit = () => {
    saveShow(
      titleInput,
      typeInput,
      genreInput,
      Number(yearInput),
      posterInput
    )
  }

  // =========================
  // OPEN ADD EPISODE
  // =========================

  const openAddEpisode = () => {
    setEditingEpisode(null)

    setEpisodeNumberInput("")
    setEpisodeTitleInput("")
    setEpisodeSeasonInput(
      String(selectedSeason)
    )

    setEpisodeFormOpen(true)
  }

  // =========================
  // OPEN EDIT EPISODE
  // =========================

  const openEditEpisode = (
    episode: Episode
  ) => {
    setEditingEpisode(episode)

    setEpisodeNumberInput(
      String(
        episode.episodeNumber
      )
    )

    setEpisodeTitleInput(
      episode.title
    )

    setEpisodeSeasonInput(
      String(episode.season)
    )

    setEpisodeFormOpen(true)
  }

  // =========================
  // SUBMIT EPISODE FORM
  // =========================

  const handleEpisodeSubmit = () => {
    saveEpisode(
      Number(
        episodeNumberInput
      ),
      episodeTitleInput,
      Number(
        episodeSeasonInput
      )
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

       {/* =========================
          NAVBAR
          ========================= */}


      <nav className="border-b border-slate-800">

        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="MyWatch Logo"
              className="h-8 w-9 object-contain"
            />

            <h1 className="text-2xl font-bold text-purple-500">
              MyWatch
            </h1>

          </div>

          <Button
           onClick={openAddShow}
           >
           + Add Show
          </Button>

        </div>

      </nav>

      {/* =========================
          MAIN
          ========================= */}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            My Watchlist
          </h2>

          <p className="mt-2 text-slate-400">
            Save your favorite movies and series in one place.
          </p>

        </div>
{/* =========================
    ADD / EDIT SHOW FORM
    ========================= */}

        {showFormOpen && (
          <ShowForm
            editingShow={editingShow !== null}
            titleInput={titleInput}
            typeInput={typeInput}
            genreInput={genreInput}
            yearInput={yearInput}
            onTitleChange={setTitleInput}
            onTypeChange={setTypeInput}
            onGenreChange={setGenreInput}
            onYearChange={setYearInput}
            onPosterUpload={handlePosterUpload}
            onSubmit={handleShowSubmit}
            onCancel={() => {
              setShowFormOpen(false)
              setEditingShow(null)
            }}
          />
        )}
        {/* =========================
            SHOW DETAIL
            ========================= */}

        {selectedShow ? (

          <div>

          <Button
                variant="outline"
                onClick={() =>
                  setSelectedShow(null)
                }
                className="mb-6"
              >
                ← Back to Watchlist
          </Button>

            <div className="grid gap-8 md:grid-cols-2">

              {/* POSTER */}

              <div className="h-96 overflow-hidden rounded-xl bg-slate-800">

                <img
                  src={
                    selectedShow.poster
                  }
                  alt={
                    selectedShow.title
                  }
                  className="h-full w-full object-contain"
                />

              </div>

              {/* INFORMATION */}

              <div>

                <span className="rounded-md bg-purple-500/20 px-2 py-1 text-sm text-purple-400">
                  {selectedShow.type}
                </span>

                <h2 className="mt-4 text-4xl font-bold">
                  {selectedShow.title}
                </h2>

                <p className="mt-4 text-slate-400">
                  {selectedShow.genre} •{" "}
                  {selectedShow.year}
                </p>

                {/* SHOW ACTIONS */}

                <div className="mt-6 flex flex-wrap gap-3">

                  <Button
                    variant="outline"
                    onClick={() =>
                      openEditShow(selectedShow)
                    }
                  >
                    Edit Show
                  </Button>

                <Button
                  variant="destructive"
                  onClick={() =>
                    deleteShow(selectedShow.id)
                  }
                >
                  Delete Show
                </Button>

                </div>

                {/* =========================
                    EPISODES
                    ========================= */}

                {selectedShow.type ===
                  "TV Series" && (

                  <div className="mt-8">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <h3 className="text-2xl font-bold">
                        Episodes
                      </h3>

                <Button
                    onClick={() => openAddEpisode()}
                   >
                    Add Episode
                </Button>

                    </div>

                    {/* SEASON */}

                    <select
                      value={selectedSeason}
                      onChange={(event) =>
                        setSelectedSeason(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="mt-4 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2"
                    >

                      <option value={1}>
                        Season 1
                      </option>

                      <option value={2}>
                        Season 2
                      </option>

                    </select>

                    {/* EPISODE FORM */}

                    {episodeFormOpen && (
                      <EpisodeForm
                        editingEpisode={editingEpisode !== null}
                        episodeNumberInput={episodeNumberInput}
                        episodeTitleInput={episodeTitleInput}
                        episodeSeasonInput={episodeSeasonInput}
                        onEpisodeNumberChange={setEpisodeNumberInput}
                        onEpisodeTitleChange={setEpisodeTitleInput}
                        onEpisodeSeasonChange={setEpisodeSeasonInput}
                        onSubmit={handleEpisodeSubmit}
                        onCancel={() => {
                          setEpisodeFormOpen(false)
                          setEditingEpisode(null)
                        }}
                      />
                    )}

                    {/* PROGRESS */}

                    <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900 p-4">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <p className="font-medium">
                          Progress
                        </p>

                        <p className="text-sm text-slate-400">
                          {
                            watchedEpisodes.length
                          }{" "}
                          /{" "}
                          {
                            selectedEpisodes.length
                          }{" "}
                          Episodes Watched
                        </p>

                      </div>

                      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">

                        <div
                          className="h-full rounded-full bg-purple-600"
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                      <p className="mt-2 text-right text-sm text-slate-400">
                        {progress}%
                      </p>

                    </div>

                    {/* EPISODE LIST */}

                    <EpisodeList
                  episodes={selectedEpisodes}
                  onToggleWatched={toggleWatched}
                  onEdit={openEditEpisode}
                  onDelete={deleteEpisode}
                />

                  </div>
                )}

              </div>

            </div>

          </div>

        ) : (

          /* =========================
              WATCHLIST
              ========================= */

          <>

            {/* SEARCH + FILTER */}

                <div className="mb-8 flex w-full flex-col gap-4 md:flex-row">

                    <div className="w-full md:flex-1">
                      <Input
                        type="text"
                        placeholder="Search your watchlist..."
                        value={search}
                        onChange={(event) =>
                          setSearch(event.target.value)
                        }
                        className="h-12 w-full border-slate-700 bg-slate-900 px-4 py-3 text-white"
                      />
                    </div>

                    <select
                      value={filter}
                      onChange={(event) =>
                        setFilter(event.target.value)
                      }
                      className="h-12 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white md:w-48"
                    >
                      <option value="All">All</option>
                      <option value="Movie">Movie</option>
                      <option value="TV Series">TV Series</option>
                    </select>

                  </div>
            {/* SHOW LIST */}

            {filteredShows.length ===
            0 ? (

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">

                <h3 className="text-xl font-semibold">
                  No shows found
                </h3>

                <p className="mt-2 text-slate-400">
                  Try another search or filter.
                </p>

              </div>

            ) : (

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {filteredShows.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  onViewDetails={setSelectedShow}
                />
              ))}

              </div>

            )}

          </>

        )}

      </main>

    </div>
  )
}

export default App