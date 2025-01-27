package house

import (
	"net/http"

	db "github.com/daniel-adam-ce/repono/back-end/internal/house/db/sqlc"
	"github.com/gin-gonic/gin"
)

type HouseGetAllParams interface {
}

type HouseGetAllResponse interface {
}

// type HouseService interface {
// 	GetAll(ctx context.Context, args HouseGetAllParams) (HouseGetAllResponse, error)
// }

type HouseServer struct {
	store  db.Store
	router *gin.Engine
}

func NewHouseServer(store db.Store) (*HouseServer, error) {
	server := &HouseServer{
		store: store,
	}

	server.Register()

	return server, nil
}

func (h *HouseServer) Start(address string) error {
	return h.router.Run(address)
}

func (h *HouseServer) Register() {
	router := gin.Default()
	router.GET("/", h.health)
	g := router.Group("/house")
	g.GET("/", h.getAll)

	h.router = router
}

func (h *HouseServer) health(ctx *gin.Context) {
	ctx.Status(http.StatusOK)
}

func (h *HouseServer) getAll(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, []string{
		"hi",
		"there",
	})
}
