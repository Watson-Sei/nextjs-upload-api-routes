package main

import (
	"crypto/sha1"
	"fmt"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	imgupload "github.com/olahol/go-imageupload"
)

func main() {
	dstDir := "./subPublic"
	router := gin.Default()
	router.POST("/upload", func(c *gin.Context) {
		img, err := imgupload.Process(c.Request, "file")
		if err != nil {
			panic(err)
		}

		thumb, err := imgupload.ThumbnailPNG(img, 200, 255)
		if err != nil {
			panic(err)
		}

		h := sha1.Sum(thumb.Data)
		savepath := filepath.Join(dstDir, fmt.Sprintf("%s_%x.jpg", time.Now().Format("20060102150405"), h[:4]))
		thumb.Save(savepath)
	})

	router.Run(":5000")
}
