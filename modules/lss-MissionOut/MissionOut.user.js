(function ($, win) {
    var missionMarkerAddBuffer = win.missionMarkerAdd;
    // /hode/show Event abfangen
    $('#missions-panel-body').on('click', '.MissionOut', function (e) {
        e.preventDefault();
        var $e = $(this);
        $('#icon_' + $e.data('header')).toggle();
        if ($(this).hasClass('btn-success')) {
            $('#mission_panel_heading_' + $e.data('header')).next().hide();
            $e.removeClass('btn-success').addClass('btn-danger');
            $e.html('<i class="glyphicon glyphicon-eye-close"></i>');
        } else {
            $('#mission_panel_heading_' + $e.data('header')).next().show();
            $e.removeClass('btn-danger').addClass('btn-success');
            $e.html('<i class="glyphicon glyphicon-eye-open"></i>');
        }
    });
    function create(h, id, icon) {
        var div = $('<div class="pull-right" id="mission_out_'+id+'"></div>');
        var $button = $('<a  href="#" class="btn btn-success btn-xs MissionOut pull-right" data-header="' + id + '" title="Mission aus/ein-blenden"><i class="glyphicon glyphicon-eye-open"></i></a>');
        div.prepend($button);
        icon.attr('id', 'icon_' + id).hide();
        h.prepend(icon);
        h.prepend(div);
    }
    win.missionMarkerAdd = function (t) {
        missionMarkerAddBuffer(t);
        var s = s = "undefined" != typeof mission_graphics[t.mtid] && null != mission_graphics[t.mtid] && "undefined" != typeof mission_graphics[t.mtid][t.vehicle_state] && "" != mission_graphics[t.mtid][t.vehicle_state] ? mission_graphics[t.mtid][t.vehicle_state] : "/images/" + t.icon + ".png";
        $('#icon_' + t.id).length && $('#icon_' + t.id).attr('src', s);
        var $header = $('#mission_panel_heading_' + t.id);
        if (!$header.find('.MissionOut').length) {
            create($header, t.id, $('#mission_vehicle_state_' + t.id).clone());
        }
        patienten(t.id, t.patients_count);
    };
    function patienten(id, t) {
        $('#pat_' + id).length ? $('#pat_' + id).html('Pat.: ' + t) : $('#mission_out_' + id).append('<small class="pull-right lssm_pat_count" id="pat_' + id + '">Pat.: ' + t + '</small>');
    }
    // Fix load Problem einmalig am Anfang alle schon vorhandenen Einsätze durgehen und bearbeiten
    $('div.missionSideBarEntry:not(:hidden)').each(function () {
        var e = $(this);
        if (e.find('.MissionOut').length === 0) {
            var id = e.attr('mission_id');
            create($('#mission_panel_heading_' + id), id, $('#mission_vehicle_state_' + id).clone());
            patienten(id, $('#mission_patients_' + id + ' .patient_progress').length);
        }
    });
    var hideAll = $('<a  href="#" class="btn btn-xs btn-success" title="Missions aus/ein-blenden"><i class="glyphicon glyphicon-eye-open"></i></a>')
            .click(function () {
                var e = $(this);
                if (e.hasClass('btn-success')) {
                    e.removeClass('btn-success').addClass('btn-danger');
                    e.html('<i class="glyphicon glyphicon-eye-close"></i>');
                    $('.MissionOut').not(':hidden').each(function () {
                        var e = $(this);
                        e.html('<i class="glyphicon glyphicon-eye-close"></i>');
                        e.removeClass('btn-success').addClass('btn-danger');
                        $('#mission_panel_heading_' + e.data('header')).next().hide();
                        $('#icon_'+ e.data('header')).toggle();
                    });
                } else {
                    e.removeClass('btn-danger').addClass('btn-success');
                    e.html('<i class="glyphicon glyphicon-eye-open"></i>');
                    $('.MissionOut').not(':hidden').each(function () {
                        var e = $(this);
                        e.html('<i class="glyphicon glyphicon-eye-open"></i>');
                        $('#icon_'+ e.data('header')).toggle();
                        $('#mission_panel_heading_' + e.data('header')).next().show();
                        e.removeClass('btn-danger').addClass('btn-success');
                    });
                }
            });
    $('#mission_select_sicherheitswache').after(hideAll);
})(jQuery, window);