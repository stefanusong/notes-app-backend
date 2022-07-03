const nanoid = require('nanoid');

const notes = require('./notes');
const { successResponse, errResponse } = require('./helper');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response(successResponse('Catatan berhasil ditambahkan', { noteId: id }));
        response.code(201);
        return response;
    }

    const response = h.response(errResponse('Catatan gagal ditambahkan'));
    response.code(500);
    return response;
};

const getAllNotesHandler = () => successResponse('Catatan berhasil didapatkan', { notes });

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.find((n) => n.id === id);
    if (note) {
        return successResponse('Catatan berhasil didapatkan', { note });
    }

    const response = h.response(errResponse('Catatan tidak ditemukan'));
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;

    const note = notes.find((n) => n.id === id);
    if (note) {
        note.title = title;
        note.tags = tags;
        note.body = body;
        note.updatedAt = new Date().toISOString();

        const response = h.response(successResponse('Catatan berhasil diperbarui', null));
        response.code(200);
        return response;
    }

    const response = h.response(errResponse('Gagal memperbarui catatan. Id tidak ditemukan'));
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.find((n) => n.id === id);

    if (note) {
        notes.splice(notes.indexOf(note), 1);
        const response = h.response(successResponse('Catatan berhasil dihapus', null));
        response.code(200);
        return response;
    }

    const response = h.response(errResponse('Catatan gagal dihapus. Id tidak ditemukan'));
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
