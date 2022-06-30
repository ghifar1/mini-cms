package entity

import (
	"time"

	"github.com/google/uuid"
)

const (
	FileName = "file"
)

// File is a model for entity.File
type File struct {
	Id        uuid.UUID `gorm:"type:varbinary(36);primary_key;not_null" json:"id"`
	Tag       string    `gorm:"type:mediumtext;not null" json:"tag"`
	Filename  string    `gorm:"type:mediumtext;not null" json:"filename"`
	CreatedAt time.Time `gorm:"type:datetime;not_null" json:"created_at"`
	Deleted   bool      `gorm:"type:bool;default:false;not null" json:"deleted"`
}

func NewFile(id uuid.UUID, tag, filename string) *File {
	return &File{
		Id:        id,
		Tag:       tag,
		Filename:  filename,
		CreatedAt: time.Now(),
		Deleted:   false,
	}
}

// TableName specifies table name for GameModel.
func (model *File) TableName() string {
	return FileName
}
